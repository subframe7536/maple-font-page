import { cls } from 'cls-variant'
import { createSignal, For } from 'solid-js'

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from './ui/switch'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from './ui/tabs'

interface Props {
  class?: string
}

const families = [
  'JetBrains Mono',
  'Fira Code',
  'Cascadia Code',
]

export default function ComparsionTabs(props: Props) {
  const [isItalic, setIsItalic] = createSignal(true)
  return (
    <Tabs class={props.class}>
      <div class="flex flex-col-reverse gap-4 sm:(flex-row justify-between)">
        <TabsList class="max-w-5xl w-full xs:w-fit">
          <For each={families}>
            {item => <TabsTrigger value={item}>{item}</TabsTrigger>}
          </For>
          <TabsIndicator />
        </TabsList>
        <Switch
          class="flex items-center sm:mr-22% space-x-2"
          checked={isItalic()}
          onChange={setIsItalic}
        >
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel>Italic</SwitchLabel>
        </Switch>
      </div>
      <For each={families}>
        {item => (
          <TabsContent
            value={item}
            class={cls(
              'pr-0 max-w-5xl overflow-(x-scroll y-hidden)',
              'text-12 leading-16',
              'xs:(text-14 leading-20)',
              'sm:(text-21 leading-27)',
              'md:(text-26 leading-32)',
              'lg:(text-32 leading-38)',
              isItalic() && 'font-italic',
            )}
          >
            <div style={{ '--ff': item }}>
              Cloudflare
            </div>
            <div class="text-accent">
              Cloudflare
            </div>
          </TabsContent>
        )}
      </For>
    </Tabs>
  )
}
