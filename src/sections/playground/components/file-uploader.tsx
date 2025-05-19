import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { FileFieldTriggerProps } from '@kobalte/core/file-field'
import type { RefSignal } from '@solid-hooks/core'
import type { Accessor } from 'solid-js'

import { FileField } from '@kobalte/core/file-field'
import { Show } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'

interface Props {
  t: PlaygroundTranslation['action']['build']['file']
  zipFile: RefSignal<File | undefined>
}

export default function FileUploader(props: Props) {
  return (
    <FileField
      class="flex flex-col gap-2"
      accept=".zip"
      onFileAccept={data => props.zipFile(data[0])}
    >
      <FileField.Label class="text-sm c-secondary">{props.t.upload.title}</FileField.Label>
      <Show
        when={!props.zipFile()}
        fallback={(
          <FileField.ItemList class="h-40 flex items-center justify-center b-(2 input) rounded-md">
            {file => (
              <FileField.Item class="flex items-center justify-center gap-2 text-lg">
                <Icon name="lucide:file-archive" />
                <span>{file.name}</span>
                <FileField.ItemDeleteTrigger class="h-full" onClick={() => props.zipFile(undefined)}>
                  <Icon name="lucide:x" />
                </FileField.ItemDeleteTrigger>
              </FileField.Item>
            )}
          </FileField.ItemList>
        )}
      >
        <FileField.Dropzone
          class="h-40 b-(2 input dashed) rounded-md p-8 text-center transition-all data-[dragging=true]:(bg-muted)"
        >
          <div class="mb-4 text-sm c-note">{props.t.upload.alert}</div>
          <FileField.Trigger
            as={(triggerProps: FileFieldTriggerProps) => (
              <Button {...triggerProps} class="text-sm">
                <Icon name="lucide:upload" class="mr-2" />
                {props.t.upload.btn}
              </Button>
            )}
          />
        </FileField.Dropzone>
        <FileField.HiddenInput />
      </Show>
    </FileField>
  )
}
