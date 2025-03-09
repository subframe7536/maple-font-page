import { cls } from 'cls-variant'
import { createSignal, onMount } from 'solid-js'

import { isDEV, myGhCdnPrefix } from '../../cdn'
import Placeholder from './placeholder'

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

export default function Title(props: { slogan: string }) {
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
    <>
      <h1
        class="relative w-fit whitespace-nowrap text-12 c-primary font-700 md:(mt-0 text-16) lg:text-20 sm:text-14 hero-gradient"
        aria-label="Maple Mono"
      >
        <div
          ref={placeholder}
          class={cls(
            'absolute left-0 right-0 top-0 bottom-0 transition',
            isLoading() ? 'animate-flashing' : 'op-0',
          )}
        >
          <Placeholder />
        </div>
        <div
          class={cls(
            'inline-block',
            isLoading() ? 'invisible' : 'animate-typing',
          )}
        >
          Maple Mono
        </div>
      </h1>
      <p
        class="mt-2 w-fit text-5.5 c-accent font-(italic 600) lg:text-10 md:text-8 xs:text-6"
      >
        {props.slogan}
      </p>
    </>
  )
}
