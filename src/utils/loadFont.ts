import { useExternal } from '@solid-hooks/core/web'

import { fontPrefix } from './cdn'

function getMapleMonoFontFace(italic: boolean) {
  const suffix = italic ? 'Italic' : 'Regular'
  const src = [
    `url('${fontPrefix}/MapleMono${italic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2-variations')`,
    `local("MapleMono-NF-CN-${suffix}")`,
    `local("Maple Mono NF CN ${suffix}")`,
    `local("MapleMono-CN-${suffix}")`,
    `local("Maple Mono CN ${suffix}")`,
    `local("MapleMono-NF-${suffix}")`,
    `local("Maple Mono NF ${suffix}")`,
    `local("MapleMono-${suffix}")`,
    `local("Maple Mono ${suffix}")`,
  ].join(',')
  return new FontFace('MapleMono', src, {
    display: 'swap',
    style: italic ? 'italic' : 'normal',
  })
}
export async function loadMapleMono() {
  const face = await Promise.all([
    getMapleMonoFontFace(false).load(),
    getMapleMonoFontFace(true).load(),
  ])
  face.forEach(f => document.fonts.add(f))
}

async function getMapleMonoCNFontFace(italic: boolean) {
  const suffix = italic ? 'Italic' : 'Regular'
  const src = [
    `local("MapleMono-NF-CN-${suffix}")`,
    `local("Maple Mono NF CN ${suffix}")`,
    `local("MapleMono-CN-${suffix}")`,
    `local("Maple Mono CN ${suffix}")`,
  ].join(',')

  return new Promise<void>(
    (resolve, reject) => new FontFace('Maple Mono CN', src, {
      display: 'swap',
      style: italic ? 'italic' : 'normal',
    })
      .load()
      .then((f) => {
        document.fonts.add(f)
        resolve()
      })
      .catch(() => {
        const [el] = useExternal(
          'style',
          `@import("https://chinese-fonts-cdn.deno.dev/packages/maple-mono-cn/dist/MapleMono-CN-${suffix}/result.css")`,
        )
        el.onload = () => resolve()
        el.onerror = () => reject()
      }),
  )
}

export async function loadMapleMonoCN() {
  await Promise.all([
    getMapleMonoCNFontFace(false),
    getMapleMonoCNFontFace(true),
  ])
}
