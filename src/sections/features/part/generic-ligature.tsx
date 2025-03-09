/* eslint-disable solid/prefer-for */
import { cls } from 'cls-variant'
import { createSignal, For } from 'solid-js'

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '../../../components/ui/switch'
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '../../../components/ui/tabs'

const arr = [
  ['<>', '??', '!==', '...', '|->'],
  ['<!--', '++', '!!', '~>', '</>'],
  ['<=', '###', ':=', '<==>', '|>'],
]
export default function GenericLigature() {
  const [calt, setCalt] = createSignal('1')
  return (
    <div
      class="relative w-fit"
    >
      <Tabs value={calt()} onChange={setCalt}>
        <TabsList class="max-w-sm w-full">
          <TabsTrigger value="1">Ligature ON</TabsTrigger>
          <TabsTrigger value="0">Ligature OFF</TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
      <div
        class="mt-8 text-3xl c-muted space-y-4 lg:text-7xl md:text-6xl sm:text-4xl [&_span]:c-secondary"
        style={{
          '--feat-calt': calt(),
        }}
      >
        {
          arr.map((row, i) => (
            <div>
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
