import { cls } from 'cls-variant'
import { createSignal, For } from 'solid-js'

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {
  class?: string
}

const families = [
  'JetBrains Mono',
  'Fira Code',
  'Iosevka',
]

export default function ComparisonTabs(props: Props) {
  const [isItalic, setIsItalic] = createSignal(false)
  return (
    <Tabs class={props.class} defaultValue={families[0]}>
      <div class="flex flex-col-reverse gap-4 sm:(flex-row gap-0)">
        <TabsList class="max-w-5xl w-full sm:(max-w-70% min-w-fit) xs:max-w-90%">
          <For each={families}>
            {item => <TabsTrigger value={item}>{item}</TabsTrigger>}
          </For>
          <TabsIndicator />
        </TabsList>
        <Switch
          class="flex items-center sm:mx-auto"
          checked={isItalic()}
          onChange={setIsItalic}
        >
          <SwitchControl>
            <SwitchThumb />
          </SwitchControl>
          <SwitchLabel class="pl-2">Italic</SwitchLabel>
        </Switch>
      </div>
      <For each={families}>
        {item => (
          <TabsContent
            value={item}
            class={cls(
              'pr-0 max-w-5xl of-(x-scroll y-hidden)',
              'text-12 leading-16 h-32',
              'xs:(text-14 leading-20 h-42)',
              'sm:(text-21 leading-27 h-56)',
              'md:(text-26 leading-32 h-66)',
              'lg:(text-32 leading-38 h-78)',
              isItalic() && 'font-italic',
            )}
          >
            <div class="text-accent">
              Cloudflare
            </div>
            <div style={{ '--ff': item }}>
              Cloudflare
            </div>
          </TabsContent>
        )}
      </For>
    </Tabs>
  )
}
