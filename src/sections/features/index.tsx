import Section from '@/components/section'
import { useIndexTranslation } from '@/locales/i18n'
import { siteLocale } from '@/locales/i18n'

import FeatureCustom from './feature-custom'
import FeatureDesign from './feature-design'
import FeatureIcon from './feature-icon'
import FeatureLigature from './feature-ligature'
import FeatureVariable from './feature-variable'

export default function SectionView() {
  const { title } = useIndexTranslation(siteLocale(), 'features')
  return (
    <>
      <Section id="features" title={title}>
        <FeatureVariable />
        <FeatureDesign />
        <FeatureLigature />
        <FeatureIcon />
        <FeatureCustom />
      </Section>
    </>
  )
}
