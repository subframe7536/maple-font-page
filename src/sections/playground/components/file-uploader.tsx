import { FileUpload } from 'moraine'

import { useI18n } from '@/locales/i18n'

interface Props {
  zipFile: File | undefined
  onZipFileChange: (file: File | undefined) => void
}
export default function FileUploader(props: Props) {
  const { t } = useI18n()
  return (
    <FileUpload
      accept=".zip"
      value={props.zipFile ?? null}
      onValueChange={(file) => props.onZipFileChange(file ?? undefined)}
      label={`${t('playground.action.build.file.upload.btnStart')} ${t('playground.action.build.file.upload.btnEnd')}`}
      description={t('playground.action.build.file.upload.alert')}
      aria-label={t('playground.action.build.file.upload.title')}
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
