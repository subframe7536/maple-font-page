import { For } from 'solid-js'

import { useFeatureTranslation, siteLocale } from '@/locales/i18n'

import SubSection from './part/sub-section'

export default function SectionView() {
  const { description, title } = useFeatureTranslation(siteLocale(), 'variable')
  const data = {
    title,
    description,
    icon: 'lucide:infinity',
  } as const

  const showcaseText = 'Variable'
  return (
    <>
      <SubSection {...data}>
        <div class="mt-4 flex text-12 c-accent xs:text-16 sm:text-24 md:text-28 lg:text-32">
          <For each={showcaseText.split('')}>
            {(char, index) => (
              <span
                class="animate-wave-weight font-200"
                style={{ 'animation-delay': `${index() * 0.2}s` }}
              >
                {char}
              </span>
            )}
          </For>
        </div>
      </SubSection>
    </>
  )
}
