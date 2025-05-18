import type { FeatureState, FeatureValue } from './utils'
import type { PlaygroundTranslation } from '@/locales/playground/en'

import { featureArray } from '@data/features/features'
import { createRef, watch } from '@solid-hooks/core'
import { cls } from 'cls-variant'
import { createSignal, For, onMount, Show } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Slider,
  SliderFill,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValueLabel,
} from '@/components/ui/slider'
import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCNFromRemote, loadMapleMono } from '@/utils/loadFont'

import ConfigAction from './config'
import FreezeAction from './freeze'
import LigaSwitch from './liga-switch'
import { toStyleObject } from './utils'

export interface FontFeatureItem {
  desc: string
  text: string
  feat: string
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
  normal?: boolean
  /**
   * Unit: px
   */
  sizeRange: [start: number, end: number]
  weightRange: [start: number, end: number]
  defaultText: string
  translation: Omit<PlaygroundTranslation, 'description'>
}

export default function Playground(props: PlaygroundProps) {
  const textareaRef = createRef<HTMLTextAreaElement>()
  const [size, setSize] = createSignal(24)
  const [weight, setWeight] = createSignal(400)
  const [italic, setItalic] = createSignal('normal')
  const [feat, setFeat] = createSignal<FeatureState>(
    Object.fromEntries(featureArray.map(k => [k, k === 'calt' ? '1' : '0'])),
  )
  const [normal, setNormal] = createSignal(false)

  // -1: no load; 0: loading; 1: loaded
  const [cnLoadState, setCNLoadState] = createSignal(-1)

  onMount(() => {
    const ref = textareaRef()!
    ref.value = 'Loading...'
    if (location.search.includes('normal')) {
      setNormal(true)
    }
    loadMapleMono()
      .then(() => {
        ref.value = props.defaultText
        ref.focus()
      })
      .catch(() => ref.value = 'Fail to load Maple Mono.')
  })

  const handleChange = (feat: string, stat: FeatureValue): void => {
    setFeat(val => ({ ...val, ...{ [feat]: stat } }))
  }

  const loadCN = () => {
    if (cnLoadState() !== -1) {
      return
    }
    setCNLoadState(0)
    Promise.all([getCNFromRemote(false), getCNFromRemote(true)])
      .then(() => setCNLoadState(1))
      .catch(() => setCNLoadState(-1))
  }

  watch(() => cnLoadState(), (state) => {
    if (state === 1) {
      const textarea = textareaRef()
      if (textarea) {
        const oldText = textarea.value
        textarea.focus()
        textarea.value = `${oldText || ''}\n\n中文测试：“‘’” …… —— ，。`
        textarea.selectionStart = textarea.selectionEnd = oldText.length + 7
        textarea.scroll({ top: 99999 })
      }
    }
  })

  return (
    <div class="h-full w-full flex flex-col-reverse gap-4 p-4 md:(flex-row pr-0)">
      <div class="size-full flex flex-col gap-4 md:(w-50% gap-8 pt-4) sm:pt-2">
        <div class="flex flex-col items-start lg:flex-row sm:flex-row md:flex-col md:gap-4">
          <div class="w-full flex flex-col select-none gap-2 p-2 lg:w-40% md:w-full sm:w-40%">
            <div class="text-sm leading-none font-500">{props.translation.fontStyle.title}</div>
            <Tabs onChange={setItalic}>
              <TabsList>
                <TabsTrigger value="normal">
                  {props.translation.fontStyle.regular}
                </TabsTrigger>
                <TabsTrigger value="italic" class="font-italic">
                  {props.translation.fontStyle.italic}
                </TabsTrigger>
                <TabsIndicator />
              </TabsList>
            </Tabs>
          </div>
          <div class="w-full lg:w-30% md:w-full sm:w-30%">
            <Slider
              minValue={props.sizeRange[0]}
              maxValue={props.sizeRange[1]}
              defaultValue={[size()]}
              onChange={([s]) => setSize(s)}
              getValueLabel={params => `${params.values[0]}`}
              class="gap-3 p-2 sm:gap-5.5"
            >
              <div class="w-full flex justify-between">
                <SliderLabel for="font-size-slider">{props.translation.fontSize}</SliderLabel>
                <SliderValueLabel for="font-size-slider" />
              </div>
              <SliderTrack id="font-size-slider">
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
              class="gap-3 p-2 sm:gap-5.5"
            >
              <div class="w-full flex justify-between">
                <SliderLabel for="font-weight-slider">{props.translation.fontWeight}</SliderLabel>
                <SliderValueLabel for="font-weight-slider" />
              </div>
              <SliderTrack id="font-weight-slider">
                <SliderFill />
                <SliderThumb />
              </SliderTrack>
            </Slider>
          </div>
        </div>
        <div class="relative size-full max-h-45vh flex flex-col gap-2 px-1 sm:max-h-unset supports-[(width:1dvh)]:max-h-45dvh">
          <textarea
            ref={textareaRef}
            spellcheck="false"
            title="Playground for Maple Mono"
            class={cls(
              'size-full resize-none !b-0 bg-#0000 p-2 !outline-none scroll-smooth rounded-lg',
              cnLoadState() === 2 && 'font-cn',
            )}
            style={{
              '--fw': weight(),
              'font-size': `${size()}px`,
              'font-style': italic(),
              ...toStyleObject(feat()),
            }}
          />
          <div class="w-full flex gap-2 xs:gap-4">
            <ConfigAction
              translate={props.translation.action.config}
              guide={props.translation.action.guide}
              features={feat()}
            />
            <FreezeAction
              translate={props.translation.action.build}
              guide={props.translation.action.guide}
              features={feat()}
            />
          </div>
        </div>
      </div>
      <div class="h-40% w-full overflow-(x-hidden y-scroll) p-2 md:(h-full w-50% p-6 pt-4)">
        <h2 class="whitespace-nowrap pb-3 text-5 c-primary font-bold md:(pb-4 text-7)">
          {props.translation.sectionTitle.basic}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.basic}>
            {feature => <LigaSwitch {...feature} normal={normal()} $change={handleChange} />}
          </For>
        </div>
        <h2 class="whitespace-nowrap p-(b-4 t-6) text-5 c-primary font-bold md:text-7">
          {props.translation.sectionTitle.cv}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cv}>
            {feature => <LigaSwitch {...feature} normal={normal()} $change={handleChange} />}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">
          {props.translation.sectionTitle.italic}
        </h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.italic}>
            {feature => <LigaSwitch {...feature} normal={normal()} italic={true} $change={handleChange} />}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">
          <span>{props.translation.sectionTitle.cn}</span>
          <Button
            as="a"
            href="https://github.com/subframe7536/maple-font/issues/358"
            variant="link"
            target="_blank"
            class="parent"
          >
            <span class="c-foreground">{props.translation.sectionTitle.issue}</span>
            <Icon
              name="lucide:external-link"
              class="ml-1 c-secondary transition parent-hover:translate-(x-.5 y--.5)"
            />
          </Button>
        </h3>
        <Show
          when={cnLoadState() === 1}
          fallback={(
            <Button
              disabled={cnLoadState() === 0}
              onClick={loadCN}
              class="w-full"
            >
              {cnLoadState() === 0 ? props.translation.loading : props.translation.loadCN}
            </Button>
          )}
        >
          <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
            <For each={props.features.cn}>
              {feature => <LigaSwitch {...feature} normal={normal()} cn={true} $change={handleChange} />}
            </For>
          </div>
        </Show>

        <h2 class="py-4 text-5 c-primary font-bold md:text-7">
          {props.translation.sectionTitle.ss}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.ss}>
            {feature => <LigaSwitch {...feature} normal={normal()} italic={feature.text === 'all'} $change={handleChange} />}
          </For>
        </div>
      </div>
    </div>
  )
}
