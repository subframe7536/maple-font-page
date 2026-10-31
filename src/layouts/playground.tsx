import featBasic from '@data/features/basic.json'
import featCN from '@data/features/cn.json'
import featCV from '@data/features/cv.json'
import type { FeatureDescription } from '@data/features/features'
import featItalic from '@data/features/italic.json'
import featSS from '@data/features/ss.json'

import { localePath, useI18n } from '@/locales/i18n'
import type { FontFeatureItem } from '@/sections/playground'
import PlaygroundArea from '@/sections/playground'
export default function PlaygroundPage() {
  const { locale, t } = useI18n()

  function parseFeature(config: Record<string, Record<string, string>>): FontFeatureItem[] {
    const result: FontFeatureItem[] = []
    for (const [version, record] of Object.entries(config)) {
      for (const [feat, text] of Object.entries(record)) {
        result.push({
          feat,
          text,
          desc: t(`playground.description.${feat as keyof FeatureDescription}`) || 'Undocumented',
          version,
        })
      }
    }
    return result.sort((a, b) => (a.feat > b.feat ? 1 : -1))
  }

  const baseUrl = localePath().replace(/\/$/, '')
  const downloadLink = `${baseUrl}/download`

  const defaultText = [
    'Maple Mono, smooth your coding flow',
    'abcdefghijklmnopqrstuvwxyz',
    '~!@#$%^&* {} [] () I1l O0o',
    '!== \\\\ <= #{ -> ~@ |> 0x12',
    '|=>==<==>=|======|===|===>',
    '<---|--|--------|-<->--<-|',
    '[INFO] todo)) fixme))',
    'Input your text here.',
  ].join('\n\n')

  return (
    <PlaygroundArea
      features={{
        basic: parseFeature(featBasic),
        cv: parseFeature(featCV),
        italic: parseFeature(featItalic),
        cn: parseFeature(featCN),
        ss: parseFeature(featSS),
      }}
      sizeRange={[8, 144]}
      weightRange={[100, 800]}
      defaultText={defaultText}
      downloadURL={downloadLink}
      isCn={locale() === 'zh-cn'}
    />
  )
}
