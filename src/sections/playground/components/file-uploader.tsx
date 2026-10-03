import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { RefSignal } from '@solid-hooks/core'

import { FileUpload } from 'moraine'
interface Props { t: PlaygroundTranslation['action']['build']['file'], zipFile: RefSignal<File | undefined> }
export default function FileUploader(props: Props) {
  return (
    <FileUpload
      accept=".zip"
      value={props.zipFile() ?? null}
      onValueChange={file => props.zipFile(file ?? undefined)}
      label={`${props.t.upload.btnStart} ${props.t.upload.btnEnd}`}
      description={props.t.upload.alert}
      aria-label={props.t.upload.title}
      icon="i-lucide:upload"
      fileIcon="i-lucide:file-archive"
      classes={{ control: 'h-40 b-(2 input dashed) rounded-md text-center', files: 'min-h-40' }}
    />
  )
}
