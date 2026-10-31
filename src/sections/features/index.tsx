import Section from '@/components/section'
import { useI18n } from '@/locales/i18n'

import FeatureCustom from './feature-custom'
import FeatureDesign from './feature-design'
import FeatureIcon from './feature-icon'
import FeatureLigature from './feature-ligature'
import FeatureVariable from './feature-variable'

export default function SectionView() {
  const { t } = useI18n()
  return (
    <>
      <Section id="features" title={t('index.features.title')}>
        <FeatureVariable />
        <FeatureDesign />
        <FeatureLigature />
        <FeatureIcon />
        <FeatureCustom />
      </Section>
    </>
  )
}
