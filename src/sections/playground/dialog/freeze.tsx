import { Button, Dialog, Tabs } from 'moraine'
import { createEffect, createMemo, createSignal, For, on, Show } from 'solid-js'

import Icon from '@/components/icon'
import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { FileFormat } from '@/utils/feature'

import {
  buildTargetURL,
  checkModuleWorkerSupport,
  FILE_FORMAT,
  parseIdString,
} from '../../../utils/feature'
import FileUploader from '../components/file-uploader'
import GuideLink from '../components/guide-link'
import { UrlForm } from '../components/url-form'
import { useFontPatcher } from '../patcher/hook'

import type { ConfigActionDialogProps } from './config'

interface Props {
  t: PlaygroundTranslation['action']['build']
  tGuide: PlaygroundTranslation['action']['guide']
  features: ConfigActionDialogProps['features']
  width: ConfigActionDialogProps['width']
  downloadURL: string
}

export default function FreezeActionDialog(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [isSupportWorker, setIsSupportWorker] = createSignal<boolean>()
  const [curTab, setCurTab] = createSignal<'dl' | 'up'>('up')
  const [zipFile, setZipFile] = createSignal<File>()
  const [proxyURL, setProxyURL] = createSignal('https://cors.subf.workers.dev/https://github.com')
  const [useHinted, setUseHinted] = createSignal(false)
  const [fileFormat, setFileFormat] = createSignal<FileFormat>(FILE_FORMAT[0])
  let logPanelRef: HTMLDivElement | undefined

  const targetURL = createMemo(() =>
    buildTargetURL({
      userInputURL: proxyURL(),
      useHinted: useHinted(),
      fileFormat: fileFormat(),
    }),
  )

  const { status, logList, init, patch, log } = useFontPatcher(
    () => logPanelRef,
    () => props.features,
  )

  createEffect(
    on(
      zipFile,
      (file, prev) => {
        if (file) {
          log(`Add File: ${file.name}`)
        } else {
          log(`Remove File: ${prev?.name}`)
        }
      },
      { defer: true },
    ),
  )

  const shouldDisabled = createMemo(() => {
    if (!isSupportWorker()) {
      return true
    }
    return status() !== 'ready' || (curTab() === 'up' && !zipFile())
  })

  let id = ''
  function listenOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (isOpen) {
      if (isSupportWorker() === undefined) {
        setIsSupportWorker(checkModuleWorkerSupport())
      }
      init(isSupportWorker(), props.width)
      const parsedId = parseIdString(props.features)
      if (id !== parsedId) {
        id = parsedId
        log(`Freezed features: ${parsedId}`)
      }
    }
  }

  const DownloadContent = () => (
    <div>
      <UrlForm
        t={props.t}
        guide={props.tGuide}
        fileFormat={fileFormat}
        setFileFormat={setFileFormat}
        useHinted={useHinted}
        setUseHinted={setUseHinted}
        proxyURL={proxyURL}
        setProxyURL={setProxyURL}
      />
      <div class="mt-4">
        <div class="mb-2 text-sm text-primary">{props.t.options.finalURL}</div>
        <div class="break-all text-xs">{targetURL()}</div>
      </div>
    </div>
  )

  const UploadContent = () => (
    <div>
      <div class="mb-2 text-sm text-secondary">{props.t.file.get.title}</div>
      <div class="my-3 text-sm">
        {props.t.file.get.descStart}{' '}
        <GuideLink link={props.downloadURL} class="text-primary" text={props.t.file.get.text} />{' '}
        {props.t.file.get.descEnd}
      </div>
      <FileUploader t={props.t.file} zipFile={zipFile()} onZipFileChange={setZipFile} />
    </div>
  )

  return (
    <Dialog open={open()} onOpenChange={listenOpenChange}>
      <Dialog.Trigger as={Button} size="md" class="w-full px-2" variant="secondary">
        <Icon name="lucide:hammer" class="mr-2" />
        {props.t.btnText}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title class="flex items-center c-primary">
          <Show
            when={!isSupportWorker()}
            fallback={<Icon name="lucide:hammer" class="mr-2 size-6 c-accent" />}
          >
            <Icon name="lucide:circle-x" class="mr-2 size-6 c-red" />
          </Show>
          {props.t.title}
        </Dialog.Title>
        <Show
          when={isSupportWorker()}
          fallback={
            <div class="py-4">
              {props.t.unsupported}
              <GuideLink {...props.tGuide} />
            </div>
          }
        >
          <Tabs
            value={curTab()}
            onChange={(value) => setCurTab(value as 'dl' | 'up')}
            aria-label={props.t.title}
            classes={{ content: 'pt-4' }}
            items={[
              {
                value: 'up',
                label: (
                  <>
                    <Icon name="lucide:upload" />
                    <span class="sr-only xs:not-sr-only xs:block">{props.t.tab.upload}</span>
                  </>
                ),
                content: <UploadContent />,
              },
              {
                value: 'dl',
                label: (
                  <>
                    <Icon name="lucide:link" />
                    <span class="sr-only xs:not-sr-only xs:block">{props.t.tab.download}</span>
                  </>
                ),
                content: <DownloadContent />,
              },
            ]}
          />
          <h3 class="text-lg c-accent font-bold">{props.t.log}</h3>
          <div class="text-xs c-note">{props.t.memoryAlert}</div>
          <div ref={(element) => (logPanelRef = element)} class="h-25 of-scroll text-sm sm:h-50">
            <For each={logList()}>
              {([msg, isError]) => (
                <div class={isError ? 'c-red' : ''}>
                  {isError ? '[ERROR]' : '[INFO]'} {msg}
                </div>
              )}
            </For>
          </div>
        </Show>
        <Dialog.Footer>
          <Button
            disabled={shouldDisabled()}
            onClick={() => patch(curTab() === 'up' ? zipFile()! : targetURL())}
          >
            {props.t.download}
          </Button>
          <Button as="a" href={props.t.chooseGuide.link} target="_blank" variant="secondary">
            {props.t.chooseGuide.text}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
