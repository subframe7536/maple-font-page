import type { defineEmits } from '@solid-hooks/core'

import { useEmits } from '@solid-hooks/core'
import { createSignal } from 'solid-js'

import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '../../components/ui/tabs'

type Emits = defineEmits<{
  change: [feat: string, state: string]
}>

export default function LigaSwitch(props: Emits & { feat: string, text: string }) {
  const emits = useEmits(props)
  return (
    <Tabs onChange={state => emits('change', props.feat, state)}>
      <TabsList>
        <TabsTrigger value="0">{props.text}</TabsTrigger>
        <TabsTrigger value="1">{props.text}</TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  )
}
