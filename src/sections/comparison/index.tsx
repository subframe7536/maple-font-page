import Section from '@/components/section'
import { useIndexTranslation } from '@/locales/i18n'
import { siteLocale } from '@/locales/i18n'

import ComparsionTabs from './comparison-tabs'

export default function SectionView() {
  const { subTitle, title } = useIndexTranslation(siteLocale(), 'comparison')
  const data = {
    id: 'comparison',
    title,
    subTitle,
  }
  return (
    <>
      <Section {...data}>
        <div class="mx-auto max-w-5xl">
          <ComparsionTabs />
        </div>
      </Section>
    </>
  )
}
