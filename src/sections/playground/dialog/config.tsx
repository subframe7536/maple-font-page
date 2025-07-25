import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { ExtraConfig, ExtraConfigKey } from '@/utils/feature'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import { createRef } from '@solid-hooks/core'
import { useCopy } from '@solid-hooks/core/web'
import { cls } from 'cls-variant'
import { createMemo, createSignal, For } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxControl, CheckboxLabel } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toCliFlag, toConfigJson } from '@/utils/feature'

import GuideLink from '../components/guide-link'

export interface Props {
  t: PlaygroundTranslation['action']['config']
  tGuide: PlaygroundTranslation['action']['guide']
  features: Record<string, '0' | '1'>
}

function ConfigSection(
  props: {
    type: 'cli' | 'json'
    title: string
    data: Props['features']
    fallback: string
    extra: ExtraConfig
  },
) {
  const { copy, isCopied } = useCopy()
  const textareaRef = createRef<HTMLTextAreaElement>()

  function copyTextArea() {
    const val = textareaRef()?.value
    if (val) {
      copy(val)
    }
  }

  const parsedText = createMemo(
    () => props.type === 'cli'
      ? toCliFlag(props.data, props.extra)
      : toConfigJson(props.data, props.extra).replace('"scale_factor": 1', '"scale_factor": 1.0'),
  )

  return (
    <>
      <h2 class="mb-2 flex select-none items-center gap-2">
        <div class="c-accent sm:text-lg">{props.title}</div>
        <Button
          size="icon"
          variant="outline"
          disabled={!parsedText() || isCopied()}
          class={cls('!b-0', (!parsedText() || isCopied()) && 'cursor-not-allowed')}
          onClick={copyTextArea}
        >
          <Icon name={isCopied() ? 'lucide:copy-check' : 'lucide:copy'} title="copy" />
        </Button>
      </h2>
      <textarea
        ref={textareaRef}
        name={props.type}
        title={props.title}
        disabled={!parsedText()}
        class={cls(
          'w-full resize-none bg-#0000 !b-0 !outline-none',
          props.type === 'json' && 'h-40 sm:h-60',
          props.type === 'cli' && 'h-10 whitespace-nowrap',
        )}
        value={parsedText() || props.fallback}
      />
    </>
  )
}

export default function ConfigActionDialog(props: Props) {
  const [extraConfig, setExtraConfig] = createSignal<ExtraConfig>({
    nf: true,
    cn: false,
    hinted: true,
    normal: false,
  })

  return (
    <Dialog>
      <DialogTrigger
        as={(triggerProps: DialogTriggerProps) => (
          <Button
            size="md"
            class="w-full !px-2"
            {...triggerProps}
          >
            <Icon name="lucide:braces" class="mr-2" />
            {props.t.btnText}
          </Button>
        )}
      />
      <DialogContent>
        <DialogTitle class="flex items-center text-primary">
          <Icon name="lucide:braces" class="mr-2 size-6 c-accent" />
          {props.t.title}
        </DialogTitle>
        <div>
          <p class="text-sm">
            {props.t.description}
            <GuideLink {...props.tGuide} />
          </p>
          <div class="grid my-6 gap-3 sm:(grid-cols-2 my-6)">
            <For each={Object.entries(props.t.extra)}>
              {([key, str]) => (
                <Checkbox
                  checked={extraConfig()[key as ExtraConfigKey]}
                  onChange={v => setExtraConfig(old => ({ ...old, ...{ [key]: v } }))}
                  class="flex items-center space-x-2"
                >
                  <CheckboxControl />
                  <CheckboxLabel>{str}</CheckboxLabel>
                </Checkbox>
              )}
            </For>
          </div>
          <ConfigSection
            type="cli"
            title={props.t.cliFlags}
            data={props.features}
            fallback={props.t.noNeed}
            extra={extraConfig()}
          />
          <ConfigSection
            type="json"
            title="config.json"
            data={props.features}
            fallback={props.t.noNeed}
            extra={extraConfig()}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
