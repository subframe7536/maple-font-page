import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { FileFieldTriggerProps } from '@kobalte/core/file-field'
import type { RefSignal } from '@solid-hooks/core'

import { FileField } from '@kobalte/core/file-field'
import { Show } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'

interface Props {
  t: PlaygroundTranslation['action']['build']['file']
  zipFile: RefSignal<File | undefined>
}

export default function FileUploader(props: Props) {
  const Alert = () => (
    <div class="px-4 text-center text-xs c-note xs:text-sm">
      {props.t.upload.alert}
    </div>
  )
  return (
    <FileField
      class="relative flex flex-col gap-2"
      accept=".zip"
      onFileAccept={data => props.zipFile(data[0])}
    >
      <FileField.Label class="break-words text-sm c-secondary">{props.t.upload.title}</FileField.Label>
      <Show
        when={!props.zipFile()}
        fallback={(
          <FileField.ItemList class="h-40 flex flex-col items-center justify-center gap-4 b-(2 primary) rounded-md text-center">
            {file => (
              <>
                <Alert />
                <FileField.Item class="h-9 flex items-center justify-center gap-2 text-primary sm:text-lg">
                  <Icon name="lucide:file-archive" />
                  <span class="max-w-40 truncate sm:max-w-unset xs:max-w-70">{file.name}</span>
                  <FileField.ItemDeleteTrigger class="h-full" onClick={() => props.zipFile(undefined)}>
                    <Icon name="lucide:x" />
                  </FileField.ItemDeleteTrigger>
                </FileField.Item>
              </>
            )}
          </FileField.ItemList>
        )}
      >
        <FileField.Dropzone
          class="h-40 flex flex-col items-center justify-center gap-4 b-(2 input dashed) rounded-md text-center transition-all data-[dragging=true]:(bg-muted)"
        >
          <Alert />
          <FileField.Trigger
            as={(triggerProps: FileFieldTriggerProps) => (
              <Button {...triggerProps} class="w-80% flex items-center gap-2 text-sm sm:w-unset">
                <Icon name="lucide:upload" />
                <span class="hidden xs:block">{props.t.upload.btnStart}</span>
                <span>{props.t.upload.btnEnd}</span>
              </Button>
            )}
          />
        </FileField.Dropzone>
        <FileField.HiddenInput />
      </Show>
    </FileField>
  )
}
