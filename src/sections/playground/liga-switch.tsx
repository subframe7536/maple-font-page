import type { defineEmits } from '@solid-hooks/core'

import { useEmits } from '@solid-hooks/core'
import { cls } from 'cls-variant'

import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '../../components/ui/tabs'

type Emits = defineEmits<{
  change: [feat: string, state: string]
}>

interface Props {
  feat: string
  text: string
  italic?: boolean
}

export default function LigaSwitch(props: Emits & Props) {
  const emits = useEmits(props)
  return (
    <Tabs
      // class="!w-fit"
      onChange={state => emits('change', props.feat, state)}
    >
      <TabsList class="relative">
        <TabsTrigger
          value="0"
          class={cls(props.italic && '!font-italic')}
          style={{ [`--feat-${props.feat}`]: '0' }}
          title={`turn off "${props.feat}"`}
        >
          {props.text}
        </TabsTrigger>
        <TabsTrigger
          value="1"
          class={cls(props.italic && '!font-italic')}
          style={{ [`--feat-${props.feat}`]: '1' }}
          title={`turn on "${props.feat}"`}
        >
          {props.text}
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
    </Tabs>
  )
}
