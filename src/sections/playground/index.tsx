import type { FeatureState, FeatureValue } from '../../utils/feature'
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
import { toStyleObject } from '@/utils/feature'
import { getCNFromRemote, loadMapleMono } from '@/utils/loadFont'

import LigaSwitch from './components/liga-switch'
import ConfigActionDialog from './dialog/config'
import FreezeActionDialog from './dialog/freeze'
import LoadCnDialog from './dialog/load-cn'
import LoadErrorDialog from './dialog/load-error'

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
  t: Omit<PlaygroundTranslation, 'description'>
  downloadURL: string
  isCn: boolean | undefined
}

const STATE = {
  INIT: -1,
  LOADING: 0,
  SUCCESS: 1,
  FAILED: 2,
} as const

type LoadingStatus = typeof STATE[keyof typeof STATE]

export default function Playground(props: PlaygroundProps) {
  const textareaRef = createRef<HTMLTextAreaElement>()
  const [size, setSize] = createSignal(24)
  const [weight, setWeight] = createSignal(400)
  const [italic, setItalic] = createSignal('normal')
  const [feat, setFeat] = createSignal<FeatureState>(
    Object.fromEntries(featureArray.map(k => [k, k === 'calt' ? '1' : '0'])),
  )
  const [normal, setNormal] = createSignal(false)

  // -1: no load; 0: loading; 1: loaded; 2: load failed
  const [monoLoadState, setMonoLoadState] = createSignal<LoadingStatus>(STATE.INIT)
  const [cnLoadState, setCNLoadState] = createSignal<LoadingStatus>(STATE.INIT)

  onMount(() => {
    const ref = textareaRef()!
    setMonoLoadState(STATE.LOADING)
    ref.value = 'Loading...'
    if (location.search.includes('normal')) {
      setNormal(true)
    }
    loadMapleMono()
      .then(() => {
        ref.value = props.defaultText
        ref.focus()
        setMonoLoadState(STATE.SUCCESS)
      })
      .catch(() => {
        ref.value = 'Fail to load Maple Mono.'
        setMonoLoadState(STATE.FAILED)
      })
  })

  const handleChange = (feat: string, stat: FeatureValue): void => {
    setFeat(val => ({ ...val, ...{ [feat]: stat } }))
  }

  const loadCN = () => {
    if (cnLoadState() === STATE.LOADING || cnLoadState() === STATE.SUCCESS) {
      return
    }
    setCNLoadState(STATE.LOADING)
    Promise.all([getCNFromRemote(false), getCNFromRemote(true)])
      .then(() => setCNLoadState(STATE.SUCCESS))
      .catch(() => setCNLoadState(STATE.FAILED))
  }

  watch(() => cnLoadState(), (state) => {
    if (state === STATE.SUCCESS) {
      const textarea = textareaRef()!
      const oldText = textarea.value
      textarea.focus()
      textarea.value = `${oldText || ''}\n\n中文测试：“‘’” …… —— ，。`
      textarea.selectionStart = textarea.selectionEnd = oldText.length + 7
      textarea.scroll({ top: 99999 })
    }
  })

  return (
    <div class="h-full w-full flex flex-col-reverse gap-4 p-4 md:(flex-row pr-0)">
      <div class="size-full flex flex-col gap-4 md:(w-50% gap-8 pt-4) sm:pt-2">
        <div class="flex flex-col items-start lg:flex-row sm:flex-row md:flex-col md:gap-4">
          <div class="w-full flex flex-col select-none gap-2 p-2 lg:w-40% md:w-full sm:w-40%">
            <div class="text-sm leading-none font-500">{props.t.fontStyle.title}</div>
            <Tabs onChange={setItalic}>
              <TabsList>
                <TabsTrigger value="normal">
                  {props.t.fontStyle.regular}
                </TabsTrigger>
                <TabsTrigger value="italic" class="font-italic">
                  {props.t.fontStyle.italic}
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
                <SliderLabel for="font-size-slider">{props.t.fontSize}</SliderLabel>
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
                <SliderLabel for="font-weight-slider">{props.t.fontWeight}</SliderLabel>
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
              cnLoadState() === STATE.SUCCESS && 'font-cn',
            )}
            style={{
              '--fw': weight(),
              'font-size': `${size()}px`,
              'font-style': italic(),
              ...toStyleObject(feat()),
            }}
          />
          <div class="w-full flex gap-2 xs:gap-4">
            <ConfigActionDialog
              t={props.t.action.config}
              tGuide={props.t.action.guide}
              features={feat()}
            />
            <FreezeActionDialog
              t={props.t.action.build}
              tGuide={props.t.action.guide}
              features={feat()}
              downloadURL={props.downloadURL}
            />
          </div>
        </div>
      </div>
      <div class="h-40% w-full of-(x-hidden y-scroll) p-2 md:(h-full w-50% p-6 pt-4)">
        <h2 class="whitespace-nowrap pb-3 text-5 c-primary font-bold md:(pb-4 text-7)">
          {props.t.sectionTitle.basic}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.basic}>
            {feature => (
              <LigaSwitch
                {...feature}
                normal={normal()}
                $change={handleChange}
              />
            )}
          </For>
        </div>
        <h2 class="whitespace-nowrap p-(b-4 t-6) text-5 c-primary font-bold md:text-7">
          {props.t.sectionTitle.cv}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.cv}>
            {feature => (
              <LigaSwitch
                {...feature}
                normal={normal()}
                $change={handleChange}
              />
            )}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">
          {props.t.sectionTitle.italic}
        </h3>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.italic}>
            {feature => (
              <LigaSwitch
                {...feature}
                normal={normal()}
                italic={true}
                $change={handleChange}
              />
            )}
          </For>
        </div>

        <h3 class="p-(b-4 t-6) text-4.5 c-secondary font-bold md:text-6">
          <span>{props.t.sectionTitle.cn}</span>
          <Button
            as="a"
            href="https://github.com/subframe7536/maple-font/issues/358"
            variant="link"
            target="_blank"
            class="parent"
          >
            <span class="c-foreground">{props.t.sectionTitle.issue}</span>
            <Icon
              name="lucide:external-link"
              class="ml-1 c-secondary transition parent-hover:translate-(x-.5 y--.5)"
            />
          </Button>
        </h3>
        <Show
          when={cnLoadState() === STATE.SUCCESS}
          fallback={(
            <Button
              disabled={cnLoadState() === STATE.LOADING || monoLoadState() !== STATE.SUCCESS}
              onClick={loadCN}
              class="w-full"
            >
              {cnLoadState() === STATE.LOADING ? props.t.loading : props.t.loadCN}
            </Button>
          )}
        >
          <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
            <For each={props.features.cn}>
              {feature => (
                <LigaSwitch
                  {...feature}
                  normal={normal()}
                  cn={true}
                  $change={handleChange}
                />
              )}
            </For>
          </div>
        </Show>

        <h2 class="py-4 text-5 c-primary font-bold md:text-7">
          {props.t.sectionTitle.ss}
        </h2>
        <div class="grid gap-4 lg:grid-cols-2 md:grid-cols-1 xs:grid-cols-2">
          <For each={props.features.ss}>
            {feature => (
              <LigaSwitch
                {...feature}
                normal={normal()}
                italic={feature.text === 'all'}
                $change={handleChange}
              />
            )}
          </For>
        </div>
      </div>
      <Show when={props.isCn && monoLoadState() === STATE.SUCCESS}>
        <LoadCnDialog $shouldLoad={loadCN} />
      </Show>
      <Show when={monoLoadState() === STATE.FAILED || cnLoadState() === STATE.FAILED}>
        <LoadErrorDialog
          title={props.t.alert.title}
          content={cnLoadState() === STATE.FAILED ? props.t.alert.cn : props.t.alert.mono}
          reload={props.t.alert.reloadPage}
        />
      </Show>
    </div>
  )
}
