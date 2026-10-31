import { useI18n } from '@/locales/i18n'

import type { FeatureCardProps } from './part/feature-card'
import FeatureCard from './part/feature-card'
import GenericLigature from './part/generic-ligature'
import SubSection from './part/sub-section'

export default function SectionView() {
  const { t } = useI18n()

  const data = {
    title: t('index.features.ligature.title'),
    description: t('index.features.ligature.description'),
    icon: 'lucide:sparkles',
  } as const

  const features: FeatureCardProps[] = [
    {
      showText: '[DEBUG] [INFO] [WARN] [ERROR]',
      showText1: '[TODO] todo)) [FIXME] fIxMe))',
      description: t('index.features.ligature.items.tag'),
      feature: 'calt',
      activeFeatures: ['calt'],
      sizeClass: 'text-8 sm:text-10 !leading-loose',
    },
    {
      showText: 'all class',
      showText1: 'ultra suffix',
      description: t('index.features.ligature.items.conn'),
      feature: 'calt',
      activeFeatures: ['calt'],
      sizeClass: 'text-8 sm:text-10',
      italic: true,
    },
    {
      showText: '1>>4',
      showText1: 'Vec<R<T>>',
      description: t('index.features.ligature.items.gts'),
      feature: 'calt',
      activeFeatures: ['calt'],
      sizeClass: 'text-8 sm:text-10',
    },
  ]
  return (
    <>
      <SubSection {...data}>
        <div class="mb-8 inview-2">
          <GenericLigature />
        </div>
        <h3 class="inview-3 py-12 text-2xl c-accent font-600">
          {t('index.features.ligature.subTitle')}
        </h3>
        <div class="grid inview-4 gap-6">
          <FeatureCard {...features[0]} enable />
          <div class="grid w-full gap-6 md:grid-cols-2">
            <FeatureCard {...features[1]} enable />
            <FeatureCard {...features[2]} enable />
          </div>
        </div>
      </SubSection>
    </>
  )
}
