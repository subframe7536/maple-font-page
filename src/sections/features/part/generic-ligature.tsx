/* eslint-disable solid/prefer-for */
import { cls } from 'cls-variant'
import { createSignal } from 'solid-js'

import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'

const arr = [
  ['<>', '??', '!==', '...', '|->'],
  ['<!--', '++', '!!', '~>', '</>'],
  ['<=', '###', ':=', '<==>', '|>'],
]
export default function GenericLigature() {
  const [calt, setCalt] = createSignal('1')
  return (
    <div
      class="relative w-full xs:w-fit"
    >
      <Tabs value={calt()} onChange={setCalt}>
        <TabsList class="max-w-80 w-full" title="Click to toggle the features: calt">
          <TabsTrigger value="1">Ligature ON</TabsTrigger>
          <TabsTrigger value="0">Ligature OFF</TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div
        class={cls(
          'mt-8 flex flex-col gap-6 text-3xl c-muted lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl',
          calt() === '1' ? '[&_span]:c-secondary' : '[&_span]:c-secondary-alt',
        )}
        style={{
          '--feat-calt': calt(),
        }}
      >
        {
          arr.map((row, i) => (
            <div class="whitespace-nowrap">
              {row.map((item, j) => {
                const char = j ? String.fromCharCode(97 + i * 4 + j - 1) : ''
                return (
                // MUST be `<>{char}<span>{item}</span></>` to remove space
                // prettier-ignore
                  <>{char}<span>{item}</span></>
                )
              })}
            </div>
          ))
        }
      </div>
    </div>
  )
}
