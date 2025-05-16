import type { loadInBrowser as load } from '@subframe7536/fonttools/web'

import { cdnPrefix, isDEV } from '@/utils/constant'

const libVer = '0.3.1'
const base = `${cdnPrefix}/@subframe7536/fonttools@${libVer}`

async function loadInBrowser(): ReturnType<typeof load> {
  const whlURL = `https://unpkg.com/@subframe7536/fonttools@${libVer}/dist`
  const stdLibURL = `${whlURL}/python_stdlib.zip`

  const m = isDEV
    ? await import('@subframe7536/fonttools/web')
    : await import(/* @vite-ignore */ `${base}/dist/web.js`)

  return m.loadInBrowser({
    ...isDEV
      ? {}
      : {
          indexURL: `${cdnPrefix}/@subframe7536/fonttools@${libVer}/dist`,
          stdLibURL,
          whlURL,
        },
    woff2: true,
  })
}

async function loadUtils(): Promise<typeof import('@subframe7536/fonttools/utils')> {
  return isDEV
    ? await import('@subframe7536/fonttools/utils')
    : await import(/* @vite-ignore */ `${base}/dist/utils.js?export=handleFontBuffer,generateBaseFontface`)
}

async function loadPyodide() {
  const py = await loadInBrowser()
  const { handleFontBuffer, generateBasicScript } = await loadUtils()
  console.log(py.loadedPackages)
  const buf = await fetch('/fonts/MapleMono[wght]-VF.woff2').then(r => r.arrayBuffer())
  return handleFontBuffer(
    py,
    new Uint8Array(buf),
    generateBasicScript(`print(font)`),
  )
}

loadPyodide().then(console.log)
