import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { FileFormat } from '@/utils/feature'
import type { RefSignal } from '@solid-hooks/core'

import { Checkbox, Field, Input, Select } from 'moraine'

import { FILE_FORMAT } from '@/utils/feature'

// UI: Format selector
function FormatSelector(props: {
  fileFormat: RefSignal<FileFormat>
  translate: PlaygroundTranslation['action']['build']['options']
}) {
  return (
    <Field label={props.translate.formatTitle} class="sm:w-50%">
      <Select
        value={props.fileFormat()}
        items={[...FILE_FORMAT]}
        onValueChange={(value) => {
          if (value) {
            props.fileFormat(value as FileFormat)
          }
        }}
        aria-label={props.translate.formatTitle}
      />
    </Field>
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
        onCheckedChange={props.useHinted}
        class="flex items-center gap-2"
        label={props.translate.useHinted}
      />
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
    <Field label={props.translate.proxyURL} class="gap-3">
      <Input value={props.proxyURL()} onValueChange={props.proxyURL} placeholder={props.translate.proxyURLPlaceholder} class="of-x-auto" />
    </Field>
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
