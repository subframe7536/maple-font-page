import type { features } from '../../../uno.config'

import { createRef } from '@solid-hooks/core'
import { createSignal, For, onMount } from 'solid-js'

import { loadMapleMono } from '../../cdn'
import { Slider, SliderFill, SliderLabel, SliderThumb, SliderTrack, SliderValueLabel } from '../../components/ui/slider'
import LigaSwitch from './liga-switch'

export interface FontFeatureItem {
  title: string
  text: string
  feat: typeof features[Extract<keyof typeof features, number>]
}

export interface PlaygroundProps {
  features: {
    basic: FontFeatureItem[]
    cv: FontFeatureItem[]
    italic: FontFeatureItem[]
    cn: FontFeatureItem[]
    ss: FontFeatureItem[]
  }
  /**
   * Unit: px
   */
  sizeRange: [start: number, end: number]
  weightRange: [start: number, end: number]
}

export default function Playground(props: PlaygroundProps) {
  const textareaRef = createRef<HTMLTextAreaElement>()
  const [size, setSize] = createSignal(24)
  const [weight, setWeight] = createSignal(400)
  onMount(() => {
    loadMapleMono()
    textareaRef()!.value = 'Maple Mono, smooth your coding flow~\n\nClick and input your text here.'
  })

  const handleChange = (feat: string, stat: string): void => {
    textareaRef()?.style.setProperty(`--feat-${feat}`, stat)
  }
  return (
    <div class="h-screen w-full flex flex-col-reverse gap-4 p-4 pr-0 md:flex-row">
      <div class="size-full flex flex-col gap-8 pt-5 md:(w-50% pt-8)">
        <div class="flex flex-col gap-4 lg:flex-row xs:flex-row md:flex-col">
          <Slider
            minValue={props.sizeRange[0]}
            maxValue={props.sizeRange[1]}
            defaultValue={[size()]}
            onChange={([s]) => setSize(s)}
            getValueLabel={params => `${params.values[0]}`}
            class="p-2 space-y-3"
          >
            <div class="w-full flex justify-between">
              <SliderLabel>Font Size</SliderLabel>
              <SliderValueLabel />
            </div>
            <SliderTrack>
              <SliderFill />
              <SliderThumb />
            </SliderTrack>
          </Slider>
          <Slider
            minValue={props.weightRange[0]}
            maxValue={props.weightRange[1]}
            defaultValue={[weight()]}
            onChange={([w]) => setWeight(w)}
            getValueLabel={params => `${params.values[0]}`}
            class="p-2 space-y-3"
          >
            <div class="w-full flex justify-between">
              <SliderLabel>Font Weight</SliderLabel>
              <SliderValueLabel />
            </div>
            <SliderTrack>
              <SliderFill />
              <SliderThumb />
            </SliderTrack>
          </Slider>
        </div>
        <textarea
          ref={textareaRef}
          class="size-full resize-none b-0 bg-#0000 p-2 !focus:outline-none"
          style={{
            '--fw': weight(),
            'font-size': `${size()}px`,
          }}
        />
      </div>
      <div class="h-50% w-full overflow-scroll p-8 px-2 md:(h-full w-50% pl-8)">
        <h2 class="whitespace-nowrap pb-4 text-6 c-primary font-bold md:text-8">Basic</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.basic}>
            {({ feat, text, title }) => (
              <div>
                <div class="pb-2">
                  {feat}
                  <div class="c-note text-sm font-italic">{title}</div>
                </div>
                <LigaSwitch feat={feat} text={text} $change={handleChange} />
              </div>
            )}
          </For>
        </div>
        <h2 class="whitespace-nowrap py-4 text-6 c-primary font-bold md:text-8">Character Variants</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cv}>
            {({ feat, text, title }) => (
              <div>
                <div class="pb-2">
                  {feat}
                  <div class="c-note text-sm font-italic">{title}</div>
                </div>
                <LigaSwitch feat={feat} text={text} $change={handleChange} />
              </div>
            )}
          </For>
        </div>

        <h3 class="py-4 text-5 c-secondary font-bold md:text-6">Italic Only</h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.italic}>
            {({ feat, text, title }) => (
              <div>
                <div class="pb-2">
                  {feat}
                  <div class="c-note text-sm font-italic">{title}</div>
                </div>
                <LigaSwitch feat={feat} text={text} italic={true} $change={handleChange} />
              </div>
            )}
          </For>
        </div>

        <h3 class="py-4 text-5 c-secondary font-bold md:text-6">CN Only</h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cn}>
            {({ feat, text, title }) => (
              <div>
                <div class="pb-2">
                  {feat}
                  <div class="c-note text-sm font-italic">{title}</div>
                </div>
                <LigaSwitch feat={feat} text={text} $change={handleChange} />
              </div>
            )}
          </For>
        </div>

        <h2 class="py-4 text-6 c-primary font-bold md:text-8">Stylistic Sets</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.ss}>
            {({ feat, text, title }) => (
              <div>
                <div class="pb-2">
                  {feat}
                  <div class="c-note text-sm font-italic">{title}</div>
                </div>
                <LigaSwitch feat={feat} text={text} italic={text === 'all'} $change={handleChange} />
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}
