import type { ExtraConfig, ExtraConfigKey } from './utils'
import type { PlaygroundTranslation } from '@/locales/playground/en'
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import GuideButton from './guide-button'
import { toCliFlag, toConfigJson } from './utils'

export interface Props {
  translate: PlaygroundTranslation['action']['config']
  guide: PlaygroundTranslation['action']['guide']
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
      : toConfigJson(props.data, props.extra),
  )

  return (
    <>
      <h2 class="mb-2 flex select-none items-center gap-2">
        <div class="text-accent sm:text-5">{props.title}</div>
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

export default function ConfigAction(props: Props) {
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
            {props.translate.btnText}
          </Button>
        )}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="flex items-center text-primary">
            <Icon name="lucide:braces" class="mr-2 size-6" />
            {props.translate.title}
          </DialogTitle>
        </DialogHeader>
        <div>
          <p class="text-sm">
            {props.translate.description}
            <GuideButton {...props.guide} />
          </p>
          <div class="grid my-6 gap-3 sm:(grid-cols-2 my-6)">
            <For each={Object.entries(props.translate.extra)}>
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
            title={props.translate.cliFlags}
            data={props.features}
            fallback={props.translate.noNeed}
            extra={extraConfig()}
          />
          <ConfigSection
            type="json"
            title="config.json"
            data={props.features}
            fallback={props.translate.noNeed}
            extra={extraConfig()}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
