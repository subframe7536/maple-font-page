import type { ParentProps } from 'solid-js'
import { For } from 'solid-js'

import { siteLocale, useDownloadTranslation } from '@/locales/i18n'
import { tag } from '@/utils/constant'
export default function DownloadLayout(props: ParentProps) {
  const { donations, afdian, buttons, choice } = useDownloadTranslation(siteLocale())

  return (
    <>
      <div class="mx-auto max-w-4xl w-96% px-4 pt-20 text-left prose xs:w-90%">
        <div class="mb-8 rounded-xl bg-gray-8 p-6 text-xl c-muted-foreground font-bold">
          <div class="mb-4 text-center">{donations.title}</div>
          <div class="mb-4 text-center text-sm c-note">{donations.description}</div>
          <div class="flex flex-wrap select-none items-center justify-center gap-4 text-center">
            <a href="https://www.buymeacoffee.com/subframe753" target="_blank">
              <img
                alt="Buy me a coffee"
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=subframe753&button_colour=5F7FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
              />
            </a>
            <a
              href="https://wise.com/pay/me/hwcn8yv"
              target="_blank"
              class="whitespace-nowrap rounded-lg bg-#9fe870 p-(x-4 y-2.5) text-background c-black decoration-none sm:my-0"
            >
              Wise
            </a>
            <a
              href="https://afdian.com/a/subframe7536"
              target="_blank"
              class="whitespace-nowrap rounded-lg bg-#946ce6 p-(x-4 y-2.5) text-background c-white decoration-none sm:my-0"
            >
              {afdian}
            </a>
          </div>
        </div>
        <div class="my-12">
          <h2>{choice}</h2>
          <div class="flex flex-wrap select-none gap-4">
            <For each={buttons}>
              {(props) => (
                <a
                  href={`https://github.com/subframe7536/maple-font/releases/download/${tag}/${props.fileName}`}
                  class="whitespace-nowrap b-(2 primary solid) rounded-md p-(x-3 y-2) decoration-none hover:(bg-muted c-muted-foreground)"
                >
                  <div class="text-5">{props.name}</div>
                  <div class="text-sm c-note">{props.description}</div>
                </a>
              )}
            </For>
          </div>
        </div>
        {props.children}
      </div>
    </>
  )
}
