import type { WorkerMessage, WorkerResult } from './worker'
import type { RefSignal } from '@solid-hooks/core'
import type { Accessor } from 'solid-js'

import { createArray } from '@solid-hooks/core'
import { createSignal } from 'solid-js'

export async function fetchFromURL(url: string): Promise<ArrayBuffer | undefined> {
  try {
    const bufResp = await fetch(url, {
      headers: {
        Accept: 'application/octet-stream',
      },
    })

    if (!bufResp.ok) {
      return undefined
    }

    return await bufResp.arrayBuffer()
  } catch {
    return undefined
  }
}

export function download(buffer: any, name: string) {
  const url = URL.createObjectURL(new Blob([buffer]))
  const a = document.createElement('a')
  a.href = url
  a.download = name
  a.click()
  URL.revokeObjectURL(url)
}

export function useFontPatcher(
  logPanelRef: RefSignal<HTMLDivElement | undefined>,
  features: Accessor<Record<string, '0' | '1'>>,
) {
  let worker: Worker | null = null
  let startTime: number | null = null
  const [status, setStatus] = createSignal<'loading' | 'ready' | 'running'>()
  const [logList, setLogList] = createArray<[msg: string, isError?: boolean][]>()

  function log(msg: string, isError?: boolean) {
    setLogList(arr => arr.push([msg, isError]))
    logPanelRef()?.scrollTo({ behavior: 'smooth', top: logPanelRef()!.scrollHeight })
  }

  function init(isSupportWorker: boolean = false) {
    if (!worker && isSupportWorker) {
      worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
      worker.onmessage = (e: MessageEvent<WorkerResult>) => {
        const data = e.data
        switch (data.type) {
          case 'ready':
            setStatus('ready')
            break
          case 'result':
            log(`Total time: ${(Date.now() - startTime!) / 1000}s`)
            download(data.buffer, 'patch.zip')
            setStatus('ready')
            break
          case 'log':
            log(data.msg, data.isError)
            if (data.isError) {
              setStatus('ready')
            }
        }
      }
      worker.postMessage({ type: 'init' } satisfies WorkerMessage)
      setStatus('loading')
    }
  }

  async function patch(target: string | File) {
    if (!worker) {
      return
    }

    setStatus('running')
    log('Fetching ZIP file...')

    const buf = target instanceof File
      ? await target.arrayBuffer()
      : await fetchFromURL(target)

    if (!buf) {
      log('Fail to fetch zip file', true)
      setStatus('ready')
      return
    }

    startTime = Date.now()
    log('Start patching...')
    worker!.postMessage({
      type: 'patch',
      buf,
      config: features(),
    } satisfies WorkerMessage)
  }

  return { status, logList, init, patch, log }
}
