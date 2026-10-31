import { Button, Dialog, Tabs } from 'moraine'
import { createEffect, createMemo, createSignal, For, on, Show } from 'solid-js'

import Icon from '@/components/icon'
import { useI18n } from '@/locales/i18n'
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
  features: ConfigActionDialogProps['features']
  width: ConfigActionDialogProps['width']
  downloadURL: string
}

export default function FreezeActionDialog(props: Props) {
  const { t } = useI18n()
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
        fileFormat={fileFormat}
        setFileFormat={setFileFormat}
        useHinted={useHinted}
        setUseHinted={setUseHinted}
        proxyURL={proxyURL}
        setProxyURL={setProxyURL}
      />
      <div class="mt-4">
        <div class="mb-2 text-sm text-primary">{t('playground.action.build.options.finalURL')}</div>
        <div class="break-all text-xs">{targetURL()}</div>
      </div>
    </div>
  )

  const UploadContent = () => (
    <div>
      <div class="mb-2 text-sm text-secondary">{t('playground.action.build.file.get.title')}</div>
      <div class="my-3 text-sm">
        {t('playground.action.build.file.get.descStart')}{' '}
        <GuideLink
          link={props.downloadURL}
          class="text-primary"
          text={t('playground.action.build.file.get.text')}
        />{' '}
        {t('playground.action.build.file.get.descEnd')}
      </div>
      <FileUploader zipFile={zipFile()} onZipFileChange={setZipFile} />
    </div>
  )

  return (
    <Dialog open={open()} onOpenChange={listenOpenChange}>
      <Dialog.Trigger as={Button} size="md" class="w-full px-2" variant="secondary">
        <Icon name="lucide:hammer" class="mr-2" />
        {t('playground.action.build.btnText')}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title class="flex items-center c-primary">
          <Show
            when={!isSupportWorker()}
            fallback={<Icon name="lucide:hammer" class="mr-2 size-6 c-accent" />}
          >
            <Icon name="lucide:circle-x" class="mr-2 size-6 c-red" />
          </Show>
          {t('playground.action.build.title')}
        </Dialog.Title>
        <Show
          when={isSupportWorker()}
          fallback={
            <div class="py-4">
              {t('playground.action.build.unsupported')}
              <GuideLink
                text={t('playground.action.guide.text')}
                link={t('playground.action.guide.link')}
              />
            </div>
          }
        >
          <Tabs
            value={curTab()}
            onChange={(value) => setCurTab(value as 'dl' | 'up')}
            aria-label={t('playground.action.build.title')}
            classes={{ content: 'pt-4' }}
            items={[
              {
                value: 'up',
                label: (
                  <>
                    <Icon name="lucide:upload" />
                    <span class="sr-only xs:not-sr-only xs:block">
                      {t('playground.action.build.tab.upload')}
                    </span>
                  </>
                ),
                content: <UploadContent />,
              },
              {
                value: 'dl',
                label: (
                  <>
                    <Icon name="lucide:link" />
                    <span class="sr-only xs:not-sr-only xs:block">
                      {t('playground.action.build.tab.download')}
                    </span>
                  </>
                ),
                content: <DownloadContent />,
              },
            ]}
          />
          <h3 class="text-lg c-accent font-bold">{t('playground.action.build.log')}</h3>
          <div class="text-xs c-note">{t('playground.action.build.memoryAlert')}</div>
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
            {t('playground.action.build.download')}
          </Button>
          <Button
            as="a"
            href={t('playground.action.build.chooseGuide.link')}
            target="_blank"
            variant="secondary"
          >
            {t('playground.action.build.chooseGuide.text')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
