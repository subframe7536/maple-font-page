import Section from '@/components/section'
import { useI18n } from '@/locales/i18n'

import ComparsionTabs from './comparison-tabs'

export default function SectionView() {
  const { t } = useI18n()
  const data = {
    id: 'comparison',
    title: t('index.comparison.title'),
    subTitle: t('index.comparison.subTitle'),
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
