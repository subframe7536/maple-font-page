import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { FileFormat } from '@/utils/feature'
import type { RefSignal } from '@solid-hooks/core'

import { For } from 'solid-js'

import Icon from '@/components/icon'
import { Checkbox, CheckboxControl, CheckboxLabel } from '@/components/ui/checkbox'
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '@/components/ui/text-field'
import { FILE_FORMAT } from '@/utils/feature'

import GuideLink from './guide-link'

// UI: Format selector
function FormatSelector(props: {
  fileFormat: RefSignal<FileFormat>
  translate: PlaygroundTranslation['action']['build']['options']
}) {
  return (
    <div class="relative flex flex-col gap-2 sm:w-50%">
      <div class="text-sm c-secondary">
        {props.translate.formatTitle}
      </div>
      <select
        id="select-format"
        class="size-full appearance-none b-(1 input) rounded-md bg-background p-(x-2 y-1) text-sm disabled:effect-dis focus-visible:effect-fv"
        value={props.fileFormat()}
        onChange={e => props.fileFormat(e.target.value as FileFormat)}
      >
        <For each={FILE_FORMAT}>{data => <option>{data}</option>}</For>
      </select>
      <Icon name="lucide:chevron-down" class="pointer-events-none absolute bottom-1.2 right-2" />
    </div>
  )
}

// UI: Hinted checkbox
function HintedCheckbox(props: {
  useHinted: RefSignal<boolean>
  translate: PlaygroundTranslation['action']['build']['options']
}) {
  return (
    <div class="flex flex-col gap-2 sm:(w-50% gap-3)">
      <div class="text-sm c-secondary">
        {props.translate.hintTitle}
      </div>
      <Checkbox
        checked={props.useHinted()}
        onChange={props.useHinted}
        class="flex items-center gap-2"
      >
        <CheckboxControl />
        <CheckboxLabel class="text-sm">
          {props.translate.useHinted}
        </CheckboxLabel>
      </Checkbox>
    </div>
  )
}

// UI: Proxy input
function ProxyInput(props: {
  proxyURL: RefSignal<string>
  translate: PlaygroundTranslation['action']['build']['options']
  guide: PlaygroundTranslation['action']['guide']
}) {
  return (
    <TextField value={props.proxyURL()} onChange={props.proxyURL} class="gap-3">
      <TextFieldLabel class="c-secondary font-bold">
        {props.translate.proxyURL}
        <GuideLink class="ml-2 text-xs !c-note" text="(gh-proxy)" link="https://gh-proxy.com/" />
      </TextFieldLabel>
      <TextFieldInput placeholder={props.translate.proxyURLPlaceholder} class="overflow-x-auto" />
    </TextField>
  )
}

interface Props {
  t: PlaygroundTranslation['action']['build']
  guide: PlaygroundTranslation['action']['guide']
  fileFormat: RefSignal<FileFormat>
  useHinted: RefSignal<boolean>
  proxyURL: RefSignal<string>
}

export function UrlForm(props: Props) {
  return (
    <div class="flex flex-col gap-4">
      <div class="mb-3 flex flex-col gap-4 sm:(mb-2 flex-row)">
        <FormatSelector
          fileFormat={props.fileFormat}
          translate={props.t.options}
        />
        <HintedCheckbox
          useHinted={props.useHinted}
          translate={props.t.options}
        />
      </div>
      <ProxyInput
        proxyURL={props.proxyURL}
        translate={props.t.options}
        guide={props.guide}
      />
    </div>
  )
}
