import { For } from 'solid-js'

import { useI18n } from '@/locales/i18n'

import SubSection from './part/sub-section'

export default function SectionView() {
  const { t } = useI18n()
  const data = {
    title: t('index.features.variable.title'),
    description: t('index.features.variable.description'),
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
