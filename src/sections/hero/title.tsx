import { cls } from 'cls-variant'
import { createSignal, onMount } from 'solid-js'

import { loadMapleMono } from '@/utils/loadFont'

import Placeholder from './placeholder'

export default function Title(props: { slogan: string }) {
  let placeholder: HTMLImageElement | undefined
  const [isLoading, setIsLoading] = createSignal(true)

  onMount(() => {
    loadMapleMono()
      .then(() => {
        placeholder!.addEventListener(
          'animationiteration',
          () => setIsLoading(false),
          { once: true },
        )
      })
      .catch((error) => {
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
