import type { JSX } from 'solid-js'

import { cls } from 'cls-variant'
import { createMemo, createSignal, Show } from 'solid-js'

import { Switch, SwitchControl, SwitchLabel, SwitchThumb } from '../../../components/ui/switch'

export interface FeatureCardProps {
  showText: string
  showText1?: string
  description: string
  feature: string
  activeFeatures: string[]
  italic?: boolean
  sizeClass?: string
}

/**
 * Card with feature switch
 */
export default function FeatureCard(props: FeatureCardProps) {
  const [fea, setFea] = createSignal(false)

  const styleObject = createMemo<JSX.CSSProperties>(() => {
    const val = fea() ? 1 : 0
    const extraFeatures = props.activeFeatures.map(item => [`--feat-${item}`, val])
    return {
      ...Object.fromEntries(extraFeatures),
      'font-style': props.italic ? 'italic' : 'normal',
    }
  })
  return (
    <div class="mx-auto mt--8 w-full py-4 space-y-4">
      <div
        class={cls(
          'leading-normal',
          props.sizeClass ?? 'text-20',
        )}
        style={styleObject()}
      >
        {props.showText}
        <Show when={props.showText1}>
          <br />
          {props.showText1}
        </Show>
      </div>
      <Switch
        class="flex items-center sm:mx-auto"
        checked={fea()}
        onChange={setFea}
        title={`Click to toggle the feature: ${props.activeFeatures}`}
      >
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
        <SwitchLabel class="pl-2">{props.feature}</SwitchLabel>
      </Switch>
      <div class="c-note mt-2">{props.description}</div>
    </div>

  )
}
