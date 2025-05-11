import { fontPrefix } from './constant'

function getMapleMonoFontFace(italic: boolean) {
  const suffix = italic ? 'Italic' : 'Regular'
  const src = [
    `url('${fontPrefix}/MapleMono${italic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2-variations')`,
    `local("MapleMono-${suffix}")`,
    `local("Maple Mono ${suffix}")`,
    `local("MapleMono-NF-${suffix}")`,
    `local("Maple Mono CN ${suffix}")`,
    `local("MapleMono-CN-${suffix}")`,
    `local("Maple Mono NF ${suffix}")`,
    `local("MapleMono-NF-CN-${suffix}")`,
    `local("Maple Mono NF CN ${suffix}")`,
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

export function getCNFromRemote(italic: boolean): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const entry = italic ? 'italic' : 'main'
    const href = `https://fontsapi.zeoseven.com/442/${entry}/result.css`

    const existingEl = document.querySelector(`link[href="${href}"]`) as HTMLLinkElement | null

    if (existingEl) {
      existingEl.remove()
    }

    const el = document.createElement('link')
    el.rel = 'stylesheet'
    el.href = href

    el.onload = () => resolve()
    el.onerror = () => reject(new Error(`Failed to load ${href}`))

    document.head.append(el)
  })
}
