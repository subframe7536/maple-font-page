import Section from '@/components/section'
import { useIndexTranslation } from '@/locales/i18n'
import { siteLocale } from '@/locales/i18n'

import Reason from './reason.mdx'
import ReasonCN from './reason_cn.mdx'

import './image.css'

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
          {locale!.startsWith('zh') ? <ReasonCN /> : <Reason /> }
        </div>
      </Section>
    </>
  )
}
