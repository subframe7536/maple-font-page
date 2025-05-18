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
  const [status, setStatus] = createSignal<'loading' | 'ready' | 'running'>()
  const [logArr, setArr] = createArray<[msg: string, isError?: boolean][]>()

  function init(isSupportWorker: boolean = false) {
    const ref = logPanelRef()
    if (!worker && isSupportWorker && ref) {
      worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
      worker.onmessage = (e: MessageEvent<WorkerResult>) => {
        const data = e.data
        switch (data.type) {
          case 'ready':
            setStatus('ready')
            break
          case 'result':
            download(data.buffer, 'patch.zip')
            break
          case 'log':
            setArr(arr => arr.push([data.msg, data.isError] as const))
            if (data.isError) {
              setStatus('ready')
            }
            ref.scrollTo({ behavior: 'smooth', top: ref.scrollHeight })
            break
        }
      }
      worker.postMessage({ type: 'init' })
      setStatus('loading')
    }
  }

  async function patch(target: string | ArrayBuffer) {
    if (!worker) {
      return
    }
    setStatus('running')
    setArr(arr => arr.push(['Processing...']))

    const buf = target instanceof ArrayBuffer
      ? target
      : await fetchFromURL(target)

    if (!buf) {
      setArr(arr => arr.push([
        'Fail to fetch zip file',
        true,
      ]))
      setStatus('ready')
      return
    }
    worker!.postMessage({
      type: 'patch',
      buf,
      config: features(),
    } satisfies WorkerMessage)
  }

  return { status, logArr, init, patch }
}
