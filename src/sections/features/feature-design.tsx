import { For } from 'solid-js'

import { useI18n } from '@/locales/i18n'

import type { FeatureCardProps } from './part/feature-card'
import FeatureCard from './part/feature-card'
import SubSection from './part/sub-section'

export default function SectionView() {
  const { t } = useI18n()

  const data = {
    title: t('index.features.design.title'),
    description: t('index.features.design.description'),
    icon: 'lucide:pencil',
  } as const

  const features: FeatureCardProps[] = [
    {
      showText: '@ $ &',
      showText1: '% ->',
      feature: t('index.features.design.items.cv01.name'),
      activeFeatures: ['cv01'],
      description: t('index.features.design.items.cv01.desc'),
    },
    {
      showText: 'f i l',
      showText1: 'k x y',
      feature: t('index.features.design.items.plain.name'),
      activeFeatures: ['cv32', 'cv33', 'cv34', 'cv35', 'cv36', 'cv37'],
      description: t('index.features.design.items.plain.desc'),
      italic: true,
    },
    {
      showText: 'I 1 l',
      feature: t('index.features.design.items.cv04.name'),
      activeFeatures: ['cv04'],
      description: t('index.features.design.items.cv04.desc'),
    },
    {
      showText: 'O 0 o',
      feature: t('index.features.design.items.zero.name'),
      activeFeatures: ['zero'],
      description: t('index.features.design.items.zero.desc'),
    },
  ]
  return (
    <>
      <SubSection {...data}>
        <div class="grid grid-cols-1 content-center gap-6 sm:grid-cols-2">
          <For each={features}>{(feat) => <FeatureCard {...feat} />}</For>
        </div>
      </SubSection>
    </>
  )
}
