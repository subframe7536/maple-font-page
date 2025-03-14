import type { features } from '../../../uno.config'

import { createRef } from '@solid-hooks/core'
import { createSignal, For, onMount } from 'solid-js'

import { loadMapleMono } from '../../cdn'
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from '../../components/ui/slider'
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '../../components/ui/tabs'
import LigaSwitch from './liga-switch'

export interface FontFeatureItem {
  desc: string
  text: string
  feat: typeof features[Extract<keyof typeof features, number>]
  version: string
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
  const [italic, setItalic] = createSignal('normal')
  onMount(() => {
    loadMapleMono()
    const ref = textareaRef()!
    ref.value = [
      'Maple Mono, smooth your coding flow',
      'abcdefghijklmnopqrstuvwxyz',
      '~!@#$%^&* I1l oO0 {} [] ()',
      '!= !== <= #{ ->',
      '[INFO] todo)) fixme))',
      'Input your text here.',
    ].join('\n\n')
    ref.focus()
  })

  const handleChange = (feat: string, stat: string): void => {
    textareaRef()?.style.setProperty(`--feat-${feat}`, stat)
  }
  return (
    <div class="h-full w-full flex flex-col-reverse gap-4 p-4 md:(flex-row pr-0)">
      <div class="size-full flex flex-col gap-4 pt-2 md:(w-50% gap-8 pt-8)">
        <div class="flex flex-col items-start lg:flex-row sm:flex-row md:flex-col md:gap-4">
          <div class="w-full lg:w-30% md:w-full sm:w-30%">
            <Slider
              minValue={props.sizeRange[0]}
              maxValue={props.sizeRange[1]}
              defaultValue={[size()]}
              onChange={([s]) => setSize(s)}
              getValueLabel={params => `${params.values[0]}`}
              class="p-2 space-y-3 md:space-y-5"
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
          </div>
          <div class="w-full lg:w-30% md:w-full sm:w-30%">
            <Slider
              minValue={props.weightRange[0]}
              maxValue={props.weightRange[1]}
              defaultValue={[weight()]}
              onChange={([w]) => setWeight(w)}
              getValueLabel={params => `${params.values[0]}`}
              class="p-2 space-y-3 md:space-y-5"
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
          <div class="w-full p-2 lg:w-40% md:w-full sm:w-40% space-y-2">
            <div class="text-sm leading-none font-500">Font Style</div>
            <Tabs onChange={setItalic}>
              <TabsList>
                <TabsTrigger value="normal">
                  Regular
                </TabsTrigger>
                <TabsTrigger value="italic" class="font-italic">
                  Italic
                </TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div class="relative size-full max-h-45vh sm:max-h-unset supports-[(width:1dvh)]:max-h-45dvh">
          <textarea
            ref={textareaRef}
            class="size-full resize-none b-0 bg-#0000 p-2 !focus:outline-0"
            style={{
              '--fw': weight(),
              'font-size': `${size()}px`,
              'font-style': italic(),
            }}
          />
        </div>
      </div>
      <div class="h-45% w-full overflow-y-scroll px-2 py-4 md:(h-full w-50% p-8)">
        <h2 class="whitespace-nowrap pb-4 text-5 c-primary font-bold md:text-8">Basic</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.basic}>
            {feature => <LigaSwitch {...feature} $change={handleChange} />}
          </For>
        </div>
        <h2 class="whitespace-nowrap p-(b-4 t-6) text-5 c-primary font-bold md:text-8">Character Variants</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cv}>
            {feature => <LigaSwitch {...feature} $change={handleChange} />}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">Italic Only</h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.italic}>
            {feature => <LigaSwitch {...feature} italic={true} $change={handleChange} />}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">CN Only</h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cn}>
            {feature => <LigaSwitch {...feature} $change={handleChange} />}
          </For>
        </div>

        <h2 class="py-4 text-5 c-primary font-bold md:text-8">Stylistic Sets</h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.ss}>
            {feature => <LigaSwitch {...feature} italic={feature.text === 'all'} $change={handleChange} />}
          </For>
        </div>
      </div>
    </div>
  )
}
