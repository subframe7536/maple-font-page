import './image.css'

import { Show } from 'solid-js'

import Section from '@/components/section'
import { useIndexTranslation, siteLocale } from '@/locales/i18n'

import Reason from './reason.mdx'
import ReasonCN from './reason_cn.mdx'

export default function SectionView() {
  const locale = siteLocale()
  const { title } = useIndexTranslation(locale, 'why')

  const data = {
    id: 'why',
    title,
  }
  return (
    <>
      <Section {...data}>
        <div class="inview-2 text-xl leading-relaxed prose">
          <Show when={locale.startsWith('zh')} fallback={<Reason />}>
            <ReasonCN />
          </Show>
        </div>
      </Section>
    </>
  )
}
