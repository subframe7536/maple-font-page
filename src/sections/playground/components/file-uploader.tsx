import { FileUpload } from 'moraine'

import type { PlaygroundTranslation } from '@/locales/playground/en'
interface Props {
  t: PlaygroundTranslation['action']['build']['file']
  zipFile: File | undefined
  onZipFileChange: (file: File | undefined) => void
}
export default function FileUploader(props: Props) {
  return (
    <FileUpload
      accept=".zip"
      value={props.zipFile ?? null}
      onValueChange={(file) => props.onZipFileChange(file ?? undefined)}
      label={`${props.t.upload.btnStart} ${props.t.upload.btnEnd}`}
      description={props.t.upload.alert}
      aria-label={props.t.upload.title}
      icon="i-lucide:upload"
      fileIcon="i-lucide:file-archive"
      classes={{
        control: [
          'h-40 border-2 border-input border-dashed rounded-md text-center',
          props.zipFile && 'hidden',
        ],
        files: 'min-h-40',
      }}
    />
  )
}
