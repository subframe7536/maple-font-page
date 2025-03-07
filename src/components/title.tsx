import { cls } from 'cls-variant'
import { createSignal, onMount } from 'solid-js'

import { myGhCdnPrefix } from '../cdn'

const isDEV = import.meta.env.DEV ?? process?.env.NODE_ENV === 'development'
const fontPrefix = isDEV ? `/fonts` : `${myGhCdnPrefix}/maple-font@variable/woff2/var`

function getSrc(isItalic: boolean) {
  return [
    `url('${fontPrefix}/MapleMono${isItalic ? '-Italic' : ''}[wght]-VF.woff2') format('woff2-variations')`,
    'local("Maple Mono")',
    'local("Maple Mono NF")',
    'local("Maple Mono NF CN")',
  ].join(',')
}

function loadFontFace(url: string, italic: boolean) {
  const fontFace = new FontFace('MapleMono', url, {
    display: 'swap',
    style: italic ? 'italic' : 'normal',
  })
  return fontFace.load()
}

export default function Title() {
  let placeholder: HTMLImageElement | undefined
  const [isLoading, setIsLoading] = createSignal(true)

  onMount(() => {
    Promise.all([
      loadFontFace(getSrc(false), false),
      loadFontFace(getSrc(true), true),
    ]).then(async (fontFaces) => {
      fontFaces.forEach(fontFace => document.fonts.add(fontFace))
      placeholder!.addEventListener('animationiteration', () => {
        setIsLoading(false)
      }, { once: true })
    }).catch((error) => {
      console.error('Error loading font:', error)
      setIsLoading(false)
    })
  })
  return (
    <h1
      class="relative ml-6 w-fit whitespace-nowrap text-12 c-primary font-700 md:(mt-0 text-16) lg:text-20 sm:text-14 hero-gradient"
    >
      <img
        ref={placeholder}
        src="/svg/title.svg"
        class={cls(
          'absolute left-0 right-0 top-0 bottom-0 transition',
          isLoading() ? 'animate-flashing' : 'op-0',
        )}
      />
      <div
        class={cls(
          'inline-block',
          isLoading() ? 'invisible' : 'animate-typing',
        )}
      >
        Maple Mono
      </div>
    </h1>
  )
}
