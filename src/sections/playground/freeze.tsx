import type { WorkerMessage, WorkerResult } from './worker'
import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import { createArray, createRef } from '@solid-hooks/core'
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
  TextFieldDescription,
  TextFieldInput,
  TextFieldLabel,
} from '@/components/ui/text-field'
import { tag } from '@/utils/constant'

import GuideButton from './guide-button'
import { checkModuleWorkerSupport, download, fetchFromURL } from './utils'

interface Props {
  translate: PlaygroundTranslation['action']['build']
  guide: PlaygroundTranslation['action']['guide']
  features: Record<string, '0' | '1'>
}
const FILE_FORMAT = ['TTF', 'OTF', 'NF', 'CN', 'NF-CN'] as const
type FileFormat = typeof FILE_FORMAT[number]
function parseIdString(features: Record<string, '0' | '1'>) {
  return Object.entries(features)
    .map(([k, v]) => v === '1' ? `+${k}` : (v === '0' && k === 'calt') ? '-calt' : null)
    .filter(Boolean)
    .join('; ')
}

let worker: Worker | null

export default function FreezeAction(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [isSupportWorker, setIsSupportWorker] = createSignal<boolean>()
  const [status, setStatus] = createSignal<'loading' | 'ready' | 'running'>()
  const [arr, setArr] = createArray<[msg: string, isError?: boolean][]>()
  const [userInputURL, setUserInputURL] = createSignal('https://seep.eu.org/https://github.com')
  const [useHinted, setUseHinted] = createSignal(false)
  const [fileFormat, setFileFormat] = createSignal<FileFormat>(FILE_FORMAT[0])
  const logPanelRef = createRef<HTMLDivElement>()

  const targetURL = createMemo(() => {
    let suffix = ''
    if (useHinted()) {
      if (fileFormat() === 'TTF') {
        suffix = '-AutoHint'
      }
    } else if (!fileFormat().endsWith('TF')) {
      suffix = '-unhinted'
    }
    const fileName = `MapleMono-${fileFormat()}${suffix}.zip`
    return `${userInputURL() || 'https://github.com'}/subframe7536/maple-font/releases/download/${tag}/${fileName}`
  })

  function initWorker() {
    const ref = logPanelRef()
    if (!worker && isSupportWorker() && ref) {
      worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
      worker.onmessage = (e: MessageEvent<WorkerResult>) => {
        const data = e.data
        switch (data.type) {
          case 'ready':
            setStatus('ready')
            break
          case 'result':
            download(data.buffer, 'patch.zip')
            break
          case 'log':
            setArr(arr => arr.push([data.msg, data.isError] as const))
            if (data.isError) {
              setStatus('ready')
            }
            ref.scrollTo({ behavior: 'smooth', top: ref.scrollHeight })
            break
        }
      }
      worker.postMessage({ type: 'init' })
      setStatus('loading')
    }
  }

  function listenOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (isOpen) {
      if (isSupportWorker() === undefined) {
        setIsSupportWorker(checkModuleWorkerSupport())
      }
      initWorker()
      if (worker && status() === 'ready') {
        worker.postMessage({ type: 'init' })
      }
    }
  }

  async function startPatching() {
    if (!worker) {
      return
    }
    setStatus('running')
    setArr(arr => arr.push(['Processing...']))
    const buf = await fetchFromURL(targetURL())
    if (!buf) {
      setArr(arr => arr.push([
        'Fail to fetch zip file',
        true,
      ]))
      setStatus('ready')
      return
    }
    worker!.postMessage({
      type: 'patch',
      buf,
      config: props.features,
    } satisfies WorkerMessage)
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
              <GuideButton {...props.guide} />
            </div>
          )}
        >
          <div class="flex flex-col gap-2">
            <div class="mb-2 text-sm">{parseIdString(props.features)}</div>
            <div class="mb-3 flex flex-col gap-4 sm:(mb-2 flex-row)">
              <div class="relative flex flex-col gap-2 sm:w-50%">
                <div class="text-sm c-secondary">
                  {props.translate.options.formatTitle}
                </div>
                <select
                  id="select-format"
                  class="disabled:effect-dis size-full appearance-none b-(1 input) rounded-md bg-background p-(x-2 y-1) text-sm focus-visible:effect-fv"
                  value={fileFormat()}
                  onChange={e => setFileFormat(e.target.value as any)}
                >
                  <For each={FILE_FORMAT}>
                    {data => <option>{data}</option>}
                  </For>
                </select>
                <Icon name="lucide:chevron-down" class="pointer-events-none absolute bottom-1.2 right-2" />
              </div>
              <div class="flex flex-col gap-2 sm:(w-50% gap-3)">
                <div class="text-sm c-secondary">
                  {props.translate.options.hintTitle}
                </div>
                <Checkbox
                  checked={useHinted()}
                  onChange={setUseHinted}
                  class="flex items-center gap-2"
                >
                  <CheckboxControl />
                  <CheckboxLabel class="text-sm">
                    {props.translate.options.useHinted}
                  </CheckboxLabel>
                </Checkbox>
              </div>
            </div>
            <TextField
              value={userInputURL()}
              onChange={setUserInputURL}
              class="gap-3"
            >
              <TextFieldLabel class="c-secondary font-bold">
                {props.translate.options.proxyURL}
                <GuideButton
                  class="ml-2 !c-note"
                  text="(GitHub:netnr/proxy)"
                  link="https://github.com/netnr/proxy"
                />
              </TextFieldLabel>
              <TextFieldInput
                placeholder={props.translate.options.proxyURLPlaceholder}
                class="overflow-x-auto"
              />
              <TextFieldDescription class="break-all">
                {props.translate.options.finalURL}: {targetURL()}
              </TextFieldDescription>
            </TextField>
          </div>
          <h3 class="text-lg c-accent font-bold">{props.translate.log}</h3>
          <div ref={logPanelRef} class="h-25 overflow-scroll text-sm sm:h-50">
            <For each={arr()}>
              {([msg, isError]) => (
                <div class={isError ? 'c-red' : 'c-note'}>{msg}</div>
              )}
            </For>
          </div>
        </Show>
        <DialogFooter class="flex gap-4 sm:(flex-row gap-2)">
          <Button
            as="a"
            href={props.translate.chooseGuide.link}
            variant="secondary"
          >
            {props.translate.chooseGuide.text}
          </Button>
          <Button
            disabled={!isSupportWorker() || status() !== 'ready'}
            onClick={startPatching}
          >
            {props.translate.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
