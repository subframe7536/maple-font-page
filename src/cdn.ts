export const cdnPrefix = 'https://esm.sh'
export const myGhCdnPrefix = `${cdnPrefix}/gh/subframe7536`
export const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'

const fontPrefix = isDEV ? `/fonts` : `${myGhCdnPrefix}/maple-font@variable/woff2/var`

function loadMapleMonoFontFace(italic: boolean) {
  const suffix = italic ? 'Italic' : 'Regular'
  const src = [
    `url('${fontPrefix}/test.woff2') format('woff2-variations')`,
    `url('${fontPrefix}/MapleMono${italic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2-variations')`,
    `local("MapleMono-NF-CN-${suffix}")`,
    `local("Maple Mono NF CN ${suffix}")`,
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
    loadMapleMonoFontFace(false).load(),
    loadMapleMonoFontFace(true).load(),
  ])
  return face.forEach(f => document.fonts.add(f))
}
