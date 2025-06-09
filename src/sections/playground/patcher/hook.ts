import type { WorkerMessage, WorkerResult } from './worker'
import type { RefSignal } from '@solid-hooks/core'
import type { Accessor } from 'solid-js'

import { createArray } from '@solid-hooks/core'
import { createSignal } from 'solid-js'

const DEFAULT_ZIP_NAME = 'MapleMono-patch.zip'

function parseNameWithPatch(input: File | string): string {
  let fileName: string

  if (input instanceof File) {
    fileName = input.name
  } else {
    try {
      const path = new URL(input).pathname
      fileName = path.substring(path.lastIndexOf('/') + 1)
    } catch {
      return DEFAULT_ZIP_NAME
    }
  }

  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return `${fileName}-patch.zip`
  }

  const name = fileName.substring(0, lastDotIndex)
  const extension = fileName.substring(lastDotIndex)
  return `${name}-patch${extension}`
}

export function useFontPatcher(
  logPanelRef: RefSignal<HTMLDivElement | undefined>,
  features: Accessor<Record<string, '0' | '1'>>,
) {
  let worker: Worker | null = null
  let startTime: number | null = null
  let fileName = DEFAULT_ZIP_NAME
  const [status, setStatus] = createSignal<'loading' | 'ready' | 'running'>()
  const [logList, setLogList] = createArray<[msg: string, isError?: boolean][]>()

  function log(msg: string, isError?: boolean) {
    setLogList(arr => arr.push([msg, isError]))
    logPanelRef()?.scrollTo({ behavior: 'smooth', top: logPanelRef()!.scrollHeight })
  }

  async function fetchFromURL(url: string): Promise<ArrayBuffer | undefined> {
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
    } catch (error) {
      log(error instanceof Error ? String(error) : `Unkown Error: ${error}`, true)
      return undefined
    }
  }

  function download(buffer: any, name: string) {
    const url = URL.createObjectURL(new Blob([buffer]))
    const a = document.createElement('a')
    a.href = url
    a.download = name
    a.click()
    URL.revokeObjectURL(url)
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
            log(`Download as ${fileName}`)
            download(data.buffer, fileName)
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
    if (typeof target === 'string') {
      log('Downloading font ZIP file...')
    }

    const buf = target instanceof File
      ? await target.arrayBuffer()
      : await fetchFromURL(target)

    if (!buf) {
      log('Cannot get zip file', true)
      setStatus('ready')
      return
    }

    fileName = parseNameWithPatch(target)
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
