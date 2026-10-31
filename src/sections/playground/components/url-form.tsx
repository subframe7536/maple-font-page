import { Checkbox, Field, Input, Select } from 'moraine'
import type { Accessor, Setter } from 'solid-js'

import { useI18n } from '@/locales/i18n'
import type { FileFormat } from '@/utils/feature'
import { FILE_FORMAT } from '@/utils/feature'

// UI: Format selector
function FormatSelector(props: {
  fileFormat: Accessor<FileFormat>
  setFileFormat: Setter<FileFormat>
}) {
  const { t } = useI18n()
  return (
    <Field label={t('playground.action.build.options.formatTitle')} class="sm:w-50%">
      <Select
        value={props.fileFormat()}
        items={[...FILE_FORMAT]}
        onValueChange={(value) => {
          if (value) {
            props.setFileFormat(value)
          }
        }}
        aria-label={t('playground.action.build.options.formatTitle')}
      />
    </Field>
  )
}

// UI: Hinted checkbox
function HintedCheckbox(props: { useHinted: Accessor<boolean>; setUseHinted: Setter<boolean> }) {
  const { t } = useI18n()
  return (
    <div class="flex flex-col gap-2 sm:(w-50% gap-3)">
      <div class="text-sm c-secondary">{t('playground.action.build.options.hintTitle')}</div>
      <Checkbox
        checked={props.useHinted()}
        onCheckedChange={props.setUseHinted}
        class="flex items-center gap-2"
        label={t('playground.action.build.options.useHinted')}
      />
    </div>
  )
}

// UI: Proxy input
function ProxyInput(props: { proxyURL: Accessor<string>; setProxyURL: Setter<string> }) {
  const { t } = useI18n()
  return (
    <Field label={t('playground.action.build.options.proxyURL')} class="gap-3">
      <Input
        value={props.proxyURL()}
        onValueChange={props.setProxyURL}
        placeholder={t('playground.action.build.options.proxyURLPlaceholder')}
        class="of-x-auto"
      />
    </Field>
  )
}

interface Props {
  fileFormat: Accessor<FileFormat>
  setFileFormat: Setter<FileFormat>
  useHinted: Accessor<boolean>
  setUseHinted: Setter<boolean>
  proxyURL: Accessor<string>
  setProxyURL: Setter<string>
}

export function UrlForm(props: Props) {
  return (
    <div class="flex flex-col gap-4">
      <div class="mb-3 flex flex-col gap-4 sm:(mb-2 flex-row)">
        <FormatSelector fileFormat={props.fileFormat} setFileFormat={props.setFileFormat} />
        <HintedCheckbox useHinted={props.useHinted} setUseHinted={props.setUseHinted} />
      </div>
      <ProxyInput proxyURL={props.proxyURL} setProxyURL={props.setProxyURL} />
    </div>
  )
}
