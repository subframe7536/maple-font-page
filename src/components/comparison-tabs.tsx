import { For } from 'solid-js'

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
  return (
    <Tabs class={props.class}>
      <TabsList>
        <For each={families}>
          {item => <TabsTrigger value={item}>{item}</TabsTrigger>}
        </For>
        <TabsIndicator />
      </TabsList>
      <For each={families}>
        {item => (
          <TabsContent
            value={item}
            class="text-(center 4xl) leading-loose"
            style={{ '--ff': item }}
          >
            Your Final Typeface For You Code
          </TabsContent>
        )}
      </For>
    </Tabs>
  )
}
