import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createRef } from '@solid-hooks/core'
import { useCopy } from '@solid-hooks/core/web'
import { cls } from 'cls-variant'
import { createMemo, onMount, Show } from 'solid-js'

import { toCliFlag, toConfigJson } from './converter'

export interface Props {
  translate: PlaygroundTranslation['action']['config']
  features: Record<string, '0' | '1'>
}

function ConfigSection(
  props: {
    type: 'cli' | 'json'
    title: string
    data: Props['features']
    fallback: string
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
      ? toCliFlag(props.data)
      : toConfigJson(props.data),
  )

  return (
    <>
      <h2 class="mb-2 flex select-none items-center gap-2">
        <div class="text-5 text-accent">{props.title}</div>
        <Button
          size="icon"
          variant="outline"
          disabled={isCopied()}
          class={cls('!b-0', isCopied() && 'cursor-not-allowed')}
          onClick={copyTextArea}
        >
          <Icon name={isCopied() ? 'lucide:copy-check' : 'lucide:copy'} title="copy" />
        </Button>
      </h2>
      <Show when={parsedText()} fallback={<div class="mb-6">{props.fallback}</div>}>
        <textarea
          ref={textareaRef}
          name={props.type}
          id={`conf-${props.type}`}
          title={props.title}
          class={cls(
            'w-full resize-none bg-#0000 !b-0 !outline-none',
            props.type === 'json' && 'h-60',
            props.type === 'cli' && 'h-10 whitespace-nowrap',
          )}
          value={parsedText()}
        />
      </Show>
    </>
  )
}

export default function ConfigAction(props: Props) {
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
          <DialogTitle class="text-primary">
            {props.translate.title}
          </DialogTitle>
        </DialogHeader>
        <div>
          <p class="text-sm">
            {props.translate.description}
          </p>
          <div class="my-4 xs:text-right">
            <Button
              variant="secondary"
              as="a"
              href={props.translate.guideLink}
              target="_blank"
              size="md"
              class="w-full xs:w-fit"
              title={props.translate.guide}
            >
              {props.translate.guide}
            </Button>
          </div>
          <ConfigSection
            type="cli"
            title={props.translate.cliFlags}
            data={props.features}
            fallback={props.translate.noNeed}
          />
          <ConfigSection
            type="json"
            title="config.json"
            data={props.features}
            fallback={props.translate.noNeed}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
