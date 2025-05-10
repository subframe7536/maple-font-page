import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useEmits } from '@solid-hooks/core'
import { cls } from 'cls-variant'
import { createMemo } from 'solid-js'

interface Emits {
  $change: (feat: string, state: string) => void
}

interface Props {
  feat: string
  text: string
  version: string
  desc: string
  italic?: boolean
  cn?: boolean
}

export default function LigaSwitch(props: Emits & Props) {
  const ver = createMemo(() => `v${props.version}00`)
  const emit = useEmits(props)
  return (
    <div>
      <div class="flex items-center gap-2">
        <div class="text-4 md:text-5">{props.feat}</div>
        <div
          class="cursor-default select-none rounded-sm bg-muted px-1 text-3 c-muted-foreground"
          title={`Available from ${ver()}`}
        >
          {ver()}
        </div>
      </div>
      <div class="mb-2 text-sm c-note font-italic">{props.desc}</div>
      <Tabs
        onChange={state => emit('change', props.feat, state)}
        defaultValue={props.feat === 'calt' ? '1' : '0'}
        class="select-none"
      >
        <TabsList>
          <TabsTrigger
            value="0"
            class={cls(
              props.italic && '!font-italic',
              props.cn && 'font-cn',
            )}
            style={{ [`--feat-${props.feat}`]: '0' }}
            title={`turn off "${props.feat}"`}
          >
            {props.text}
          </TabsTrigger>
          <TabsTrigger
            value="1"
            class={cls(
              props.italic && '!font-italic',
              props.cn && 'font-cn',
            )}
            style={{ [`--feat-${props.feat}`]: '1' }}
            title={`turn on "${props.feat}"`}
          >
            {props.text}
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </Tabs>
    </div>
  )
}
