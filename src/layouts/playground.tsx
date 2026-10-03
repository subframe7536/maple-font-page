import type { FontFeatureItem } from '@/sections/playground'

import featBasic from '@data/features/basic.json'
import featCN from '@data/features/cn.json'
import featCV from '@data/features/cv.json'
import featItalic from '@data/features/italic.json'
import featSS from '@data/features/ss.json'

import { usePlaygroundTranslation } from '@/locales/i18n'
import { localePath, siteLocale } from '@/locales/i18n'
import PlaygroundArea from '@/sections/playground'
export default function PlaygroundPage() {
  const { description, ...rest } = usePlaygroundTranslation(siteLocale())

  function parseFeature(config: Record<string, Record<string, string>>): FontFeatureItem[] {
    const result: FontFeatureItem[] = []
    for (const [version, record] of Object.entries(config)) {
      for (const [feat, text] of Object.entries(record)) {
        result.push({
          feat,
          text,
          desc: description[feat as keyof typeof description] || 'Undocumented',
          version,
        })
      }
    }
    return result.sort((a, b) => a.feat > b.feat ? 1 : -1)
  }

  const locale = siteLocale()
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

  return <PlaygroundArea features={{ basic: parseFeature(featBasic), cv: parseFeature(featCV), italic: parseFeature(featItalic), cn: parseFeature(featCN), ss: parseFeature(featSS) }} sizeRange={[8, 144]} weightRange={[100, 800]} defaultText={defaultText} t={rest} downloadURL={downloadLink} isCn={locale.startsWith('zh')} />
}
