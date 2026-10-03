import type { FeatureValue } from '@/utils/feature'

import { watchOnce } from '@solid-hooks/core'
import { Tabs, useCn } from 'moraine'
import { createMemo, createSignal } from 'solid-js'

import { getDefaultLigaSwitchValue as getLigaSwitchValue } from '@/utils/feature'

interface Props {
  feat: string
  text: string
  version: string
  desc: string
  italic?: boolean
  cn?: boolean
  normal?: boolean
  $change: (feat: string, state: FeatureValue) => void
}

export default function LigaSwitch(props: Props) {
  const cn = useCn()
  const ver = createMemo(() => `v${props.version}00`)
  // eslint-disable-next-line solid/reactivity
  const [value, setValue] = createSignal<FeatureValue>(props.feat === 'calt' ? '1' : '0')
  watchOnce(() => props.normal, (normal) => {
    props.$change(props.feat, setValue(getLigaSwitchValue(props.feat, normal)))
  })
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
        value={value()}
        onChange={state => props.$change(props.feat, setValue(state as FeatureValue))}
        aria-label={props.feat}
        class="select-none"
        items={['0', '1'].map(state => ({ value: state, label: (
          <span
            class={cn(props.italic && '!font-italic', props.cn && 'font-cn')}
            style={{ [`--feat-${props.feat}`]: state }}
            title={`${state === '1' ? 'turn on' : 'turn off'} "${props.feat}"`}
          >
            {props.text}
          </span>
        ) }))}
      />
    </div>
  )
}
