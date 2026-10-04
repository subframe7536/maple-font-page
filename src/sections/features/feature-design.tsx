import { For } from 'solid-js'

import { useFeatureTranslation, siteLocale } from '@/locales/i18n'

import type { FeatureCardProps } from './part/feature-card'
import FeatureCard from './part/feature-card'
import SubSection from './part/sub-section'

export default function SectionView() {
  const { description, title, items } = useFeatureTranslation(siteLocale(), 'design')

  const data = {
    title,
    description,
    icon: 'lucide:pencil',
  } as const

  const features: FeatureCardProps[] = [
    {
      showText: '@ $ &',
      showText1: '% ->',
      feature: items.cv01.name,
      activeFeatures: ['cv01'],
      description: items.cv01.desc,
    },
    {
      showText: 'f i l',
      showText1: 'k x y',
      feature: items.plain.name,
      activeFeatures: ['cv32', 'cv33', 'cv34', 'cv35', 'cv36', 'cv37'],
      description: items.plain.desc,
      italic: true,
    },
    {
      showText: 'I 1 l',
      feature: items.cv04.name,
      activeFeatures: ['cv04'],
      description: items.cv04.desc,
    },
    {
      showText: 'O 0 o',
      feature: items.zero.name,
      activeFeatures: ['zero'],
      description: items.zero.desc,
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
