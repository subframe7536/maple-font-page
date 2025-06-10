import type { FileFormat } from './utils'
import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import { createRef, watch } from '@solid-hooks/core'
import { createMemo, createSignal, For, Show } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs'

import FileUploader from './components/file-uploader'
import GuideLink from './components/guide-link'
import { UrlForm } from './components/url-form'
import { useFontPatcher } from './patcher/hook'
import {
  buildTargetURL,
  checkModuleWorkerSupport,
  FILE_FORMAT,
  parseIdString,
} from './utils'

interface Props {
  t: PlaygroundTranslation['action']['build']
  tGuide: PlaygroundTranslation['action']['guide']
  features: Record<string, '0' | '1'>
  downloadURL: string
}

export default function FreezeActionDialog(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [isSupportWorker, setIsSupportWorker] = createSignal<boolean>()
  const [curTab, setCurTab] = createSignal<'dl' | 'up'>('dl')
  const zipFile = createRef<File>()
  const proxyURL = createRef('https://gh-proxy.com/https://github.com')
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

  watch(zipFile, (file, prev) => {
    if (file) {
      log(`Add File: ${file.name}`)
    } else {
      log(`Remove File: ${prev?.name}`)
    }
  })

  const shouldDisabled = createMemo(() => {
    if (!isSupportWorker()) {
      return true
    }
    return curTab() === 'up' ? !zipFile() : status() !== 'ready'
  })

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
            {props.t.btnText}
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
            {props.t.title}
          </DialogTitle>
        </DialogHeader>
        <Show
          when={isSupportWorker()}
          fallback={(
            <div class="py-4">
              {props.t.unsupported}
              <GuideLink {...props.tGuide} />
            </div>
          )}
        >
          <Tabs value={curTab()} onChange={setCurTab}>
            <TabsList>
              <TabsTrigger value="dl" class="w-full flex items-center justify-center gap-2">
                <Icon name="lucide:link" />
                <span class="hidden xs:block">{props.t.tab.download}</span>
              </TabsTrigger>
              <TabsTrigger value="up" class="w-full flex items-center justify-center gap-2">
                <Icon name="lucide:upload" />
                <span class="hidden xs:block">{props.t.tab.upload}</span>
              </TabsTrigger>
              <TabsIndicator />
            </TabsList>
            <TabsContent value="dl" class="pt-4">
              <UrlForm
                t={props.t}
                guide={props.tGuide}
                fileFormat={fileFormat}
                useHinted={useHinted}
                proxyURL={proxyURL}
              />
              <div class="mt-4">
                <div class="mb-2 text-sm text-primary">
                  {props.t.options.finalURL}
                </div>
                <div class="break-all text-xs">
                  {targetURL()}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="up" class="pt-4">
              <div class="mb-2 text-sm text-secondary">
                {props.t.file.get.title}
              </div>
              <div class="my-3 text-sm">
                {props.t.file.get.descStart}
                {' '}
                <GuideLink
                  link={props.downloadURL}
                  class="!c-primary"
                  text={props.t.file.get.text}
                />
                {' '}
                {props.t.file.get.descEnd}
              </div>
              <FileUploader
                t={props.t.file}
                zipFile={zipFile}
              />
            </TabsContent>
          </Tabs>
          <h3 class="text-lg c-accent font-bold">{props.t.log}</h3>
          <div class="text-xs c-note">{props.t.memoryAlert}</div>
          <div ref={logPanelRef} class="h-25 overflow-scroll text-sm sm:h-50">
            <For each={logList()}>
              {([msg, isError]) => (
                <div class={isError ? 'c-red' : ''}>{isError ? '[ERROR]' : '[INFO]'} {msg}</div>
              )}
            </For>
          </div>
        </Show>
        <DialogFooter class="flex gap-4 xs:(flex-row gap-2)">
          <Button
            as="a"
            href={props.t.chooseGuide.link}
            target="_blank"
            variant="secondary"
          >
            {props.t.chooseGuide.text}
          </Button>
          <Button
            disabled={shouldDisabled()}
            onClick={() => patch(curTab() === 'up' ? zipFile()! : targetURL())}
          >
            {props.t.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
