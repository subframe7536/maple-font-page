import type { PyodideInterface } from '@subframe7536/fonttools'

import { cdnPrefix, isDEV } from '../../../utils/constant'

export type WorkerMessage =
  | { type: 'init' }
  | { type: 'patch', buf: ArrayBuffer, config: Record<string, '0' | '1'> }

export type WorkerResult =
  | { type: 'ready' }
  | { type: 'result', buffer: Uint8Array }
  | { type: 'log', msg: string, isError?: boolean }

let py: PyodideInterface | null = null

function log(msg: string) {
  postMessage({ type: 'log', msg } satisfies WorkerResult)
}
function err(msg: string) {
  postMessage({ type: 'log', msg, isError: true } satisfies WorkerResult)
}

async function loadInBrowser(): Promise<PyodideInterface> {
  const libVer = '0.3.2'
  const pkg = '@subframe7536/fonttools'
  const base = `${cdnPrefix}/${pkg}@${libVer}`

  // esm.sh seems cannot load .whl and .zip file
  const cdnPrefix1 = 'https://unpkg.com'
  const whlURL = `${cdnPrefix1}/${pkg}@${libVer}/dist`
  const stdLibURL = `${whlURL}/python_stdlib.zip`

  log(`${pkg} version: ${libVer}`)
  log(`> Base CDN: ${cdnPrefix}`)
  log(`> Python stdlib & whl CDN: ${cdnPrefix1}`)

  const m: typeof import('@subframe7536/fonttools/web') = isDEV
    ? await import('@subframe7536/fonttools/web')
    : await import(/* @vite-ignore */ `${base}/dist/web.js`)

  const prodConfig = isDEV
    ? {}
    : {
        indexURL: `${cdnPrefix}/@subframe7536/fonttools@${libVer}/dist`,
        stdLibURL,
        whlURL,
      }
  return m.loadInBrowser({
    ...prodConfig,
    // woff2: true,
    stdout: log,
    stderr: err,
  })
}

declare const __PY_SCRIPT__: string
function patchFont(
  py: PyodideInterface,
  buf: Uint8Array,
  config: Record<string, '0' | '1'>,
) {
  const sourcePath = '/tmp/data.zip'
  const targetPath = '/tmp/patch.zip'
  try {
    py.FS.writeFile(sourcePath, buf)
    py.runPython(`${__PY_SCRIPT__}
main('${sourcePath}','${targetPath}',${JSON.stringify(config)})`)
    return py.FS.readFile(targetPath)
  } finally {
    py.FS.unlink(sourcePath)
    py.FS.unlink(targetPath)
    py.runPython('import gc; gc.collect()')
  }
}

onmessage = async (e: MessageEvent<WorkerMessage>) => {
  try {
    switch (e.data.type) {
      case 'init': {
        log('Loading pyodide...')
        py = await loadInBrowser()
        postMessage({ type: 'ready' } satisfies WorkerResult)
        log('Loaded pyodide')
        break
      }
      case 'patch': {
        if (!py) {
          throw new Error('Pyodide not initialized')
        }
        const result = patchFont(py, new Uint8Array(e.data.buf), e.data.config)
        postMessage({ type: 'result', buffer: result } satisfies WorkerResult)
        break
      }
    }
  } catch (e) {
    err(e instanceof Error ? e.message : JSON.stringify(e))
  }
}
