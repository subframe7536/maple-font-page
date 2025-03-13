import type { features } from '../../../uno.config'

import { createRef } from '@solid-hooks/core'
import { For, onMount } from 'solid-js'

import { loadMapleMono } from '../../cdn'
import LigaSwitch from './liga-switch'

export interface FontFeatureItem {
  title: string
  text: string
  feat: typeof features[Extract<keyof typeof features, number>]
}

export interface PlaygroundProps {
  cv: FontFeatureItem[]
  italic: FontFeatureItem[]
  cn: FontFeatureItem[]
  ss: FontFeatureItem[]
  /**
   * Unit: px
   */
  sizeRange: [start: number, end: number]
  weightRange: [start: number, end: number]
}

export default function Playground(props: PlaygroundProps) {
  const textareaRef = createRef<HTMLTextAreaElement>()
  onMount(() => {
    loadMapleMono()
  })

  const handleChange = (feat: string, stat: string): void => {
    textareaRef()?.style.setProperty(`--feat-${feat}`, stat)
  }
  return (
    <div class="w-full flex flex-row">
      <textarea ref={textareaRef} class="bg-background" />
      <div>
        <h2>Character Variants</h2>
        <For each={props.cv}>
          {({ feat, text, title }) => (
            <div>
              <div>{title}</div>
              <LigaSwitch feat={feat} text={text} $change={handleChange} />
            </div>
          )}
        </For>
        <h3>Italic Only</h3>
        <For each={props.italic}>
          {({ feat, text, title }) => (
            <div>
              <div>{title}</div>
              <LigaSwitch feat={feat} text={text} $change={handleChange} />
            </div>
          )}
        </For>
        <h3>CN Only</h3>
        <For each={props.cn}>
          {({ feat, text, title }) => (
            <div>
              <div>{title}</div>
              <LigaSwitch feat={feat} text={text} $change={handleChange} />
            </div>
          )}
        </For>
        <h2>Stylistic Sets</h2>
        <For each={props.ss}>
          {({ feat, text, title }) => (
            <div>
              <div>{title}</div>
              <LigaSwitch feat={feat} text={text} $change={handleChange} />
            </div>
          )}
        </For>
      </div>
    </div>
  )
}
