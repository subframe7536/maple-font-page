import { For } from 'solid-js'

import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from './ui/tabs'

interface Props {
  items: {
    fontClass: string
    name: string
  }[]
  class?: string
}

export default function ComparsionTabs(props: Props) {
  return (
    <Tabs class={props.class}>
      <TabsList>
        <For each={props.items}>
          {item => <TabsTrigger value={item.fontClass}>{item.name}</TabsTrigger>}
        </For>
        <TabsIndicator />
      </TabsList>
      <For each={props.items}>
        {item => (
          <TabsContent value={item.fontClass} class={item.fontClass}>
            {item.name}: your final coding flow
          </TabsContent>
        )}
      </For>
    </Tabs>
  )
}
