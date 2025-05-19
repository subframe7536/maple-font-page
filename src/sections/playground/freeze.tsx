import type { FileFormat } from './utils'
import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'
import type { RefSignal } from '@solid-hooks/core'

import { createRef } from '@solid-hooks/core'
import { createMemo, createSignal, For, Show } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import { Checkbox, CheckboxControl, CheckboxLabel } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '@/components/ui/text-field'

import GuideLink from './guide-link'
import { useFontPatcher } from './patcher/hook'
import {
  buildTargetURL,
  checkModuleWorkerSupport,
  FILE_FORMAT,
  parseIdString,
} from './utils'

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
        class="disabled:effect-dis size-full appearance-none b-(1 input) rounded-md bg-background p-(x-2 y-1) text-sm focus-visible:effect-fv"
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
        <GuideLink class="ml-2 !c-note" text="(GitHub:netnr/proxy)" link="https://github.com/netnr/proxy" />
      </TextFieldLabel>
      <TextFieldInput placeholder={props.translate.proxyURLPlaceholder} class="overflow-x-auto" />
    </TextField>
  )
}

interface Props {
  translate: PlaygroundTranslation['action']['build']
  guide: PlaygroundTranslation['action']['guide']
  features: Record<string, '0' | '1'>
}

export default function FreezeAction(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [isSupportWorker, setIsSupportWorker] = createSignal<boolean>()
  const proxyURL = createRef('https://seep.eu.org/https://github.com')
  const useHinted = createRef(false)
  const fileFormat = createRef<FileFormat>(FILE_FORMAT[0])
  const logPanelRef = createRef<HTMLDivElement>()

  const targetURL = createMemo(() => buildTargetURL({
    userInputURL: proxyURL(),
    useHinted: useHinted(),
    fileFormat: fileFormat(),
  }))

  const { status, logList, init, patch, log } = useFontPatcher(
    logPanelRef,
    () => props.features,
  )

  let id = ''
  function listenOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (isOpen) {
      if (isSupportWorker() === undefined) {
        setIsSupportWorker(checkModuleWorkerSupport())
      }
      init(isSupportWorker())
      const parsedId = parseIdString(props.features)
      if (id !== parsedId) {
        id = parsedId
        log(`Freezed features: ${parsedId}`)
      }
    }
  }

  return (
    <Dialog open={open()} onOpenChange={listenOpenChange}>
      <DialogTrigger
        as={(triggerProps: DialogTriggerProps) => (
          <Button
            size="md"
            class="w-full !px-2"
            variant="secondary"
            {...triggerProps}
          >
            <Icon name="lucide:hammer" class="mr-2" />
            {props.translate.btnText}
          </Button>
        )}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="flex items-center c-primary">
            <Show
              when={!isSupportWorker()}
              fallback={<Icon name="lucide:hammer" class="mr-2 size-6" />}
            >
              <Icon name="lucide:circle-x" class="mr-2 size-6 c-red" />
            </Show>
            {props.translate.title}
          </DialogTitle>
        </DialogHeader>
        <Show
          when={isSupportWorker()}
          fallback={(
            <div class="py-4">
              {props.translate.unsupported}
              <GuideLink {...props.guide} />
            </div>
          )}
        >
          <div class="flex flex-col gap-2">
            <div class="mb-3 flex flex-col gap-4 sm:(mb-2 flex-row)">
              <FormatSelector
                fileFormat={fileFormat}
                translate={props.translate.options}
              />
              <HintedCheckbox
                useHinted={useHinted}
                translate={props.translate.options}
              />
            </div>
            <ProxyInput
              proxyURL={proxyURL}
              translate={props.translate.options}
              guide={props.guide}
            />
          </div>
          <div>
            <div class="mb-2 text-sm text-primary">
              {props.translate.options.finalURL}
            </div>
            <div class="break-all text-xs">
              {targetURL()}
            </div>
          </div>
          <h3 class="text-lg c-accent font-bold">{props.translate.log}</h3>
          <div ref={logPanelRef} class="h-25 overflow-scroll text-sm sm:h-50">
            <For each={logList()}>
              {([msg, isError]) => (
                <div class={isError ? 'c-red' : 'c-note'}>{isError ? '[ERROR]' : '[INFO]'} {msg}</div>
              )}
            </For>
          </div>
        </Show>
        <DialogFooter class="flex gap-4 xs:(flex-row gap-2)">
          <Button
            as="a"
            href={props.translate.chooseGuide.link}
            target="_blank"
            variant="secondary"
          >
            {props.translate.chooseGuide.text}
          </Button>
          <Button
            disabled={!isSupportWorker() || status() !== 'ready'}
            onClick={() => patch(targetURL())}
          >
            {props.translate.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
