import { cls } from 'cls-variant'
import { createResource } from 'solid-js'

const url = ''
async function fetchAndLoadFont(url: string) {
  // todo))
  const font = new FontFace('MapleMono', url, { display: 'swap', style: 'normal' })
  await font.load()
  return font
}
export default function Title() {
  const [state] = createResource(() => fetchAndLoadFont(url))
  return (
    <h1
      class="relative ml-6 w-fit whitespace-nowrap text-12 c-primary font-700 md:(mt-0 text-16) lg:text-20 sm:text-14 hero-gradient"
    >
      <img
        src="/svg/title.svg"
        class={cls(
          'absolute inset-0',
          state.loading ? 'animate-(flash count-infinite duration-4s ease-in)' : 'invisible',
        )}
      />
      <div
        class={cls(
          'inline-block',
          state.loading ? 'invisible' : 'animate-typing',
        )}
      >
        Maple Mono
      </div>
    </h1>
  )
}
