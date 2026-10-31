import { normalFeatureArray } from '@data/features/features'
import { Button } from 'moraine'

import samples from '@/assets/code-samples'
import mapleTheme from '@/assets/maple-dark-color-theme.json'
import Code from '@/components/code'
import { localePath, useI18n } from '@/locales/i18n'

import SubSectionTitle from './part/sub-section-title'

export default function SectionView() {
  const { t } = useI18n()

  const [first, second] = t('index.features.custom.normal.description').split('@')

  const data = {
    title: t('index.features.custom.title'),
    description: t('index.features.custom.description'),
    icon: 'lucide:hammer',
  } as const

  const code = samples.code

  const normalCode = samples.normalCode

  const baseUrl = localePath().replace(/\/$/, '')
  const playgroundLink = `${baseUrl}/playground?normal`
  return (
    <>
      <SubSectionTitle icon={data.icon} title={data.title}>
        <div class="grid gap-4 md:(grid-cols-2 items-center gap-8)">
          <Code
            code={code}
            theme={mapleTheme}
            lang="jsonc"
            class="inview-1 rounded-lg p-4 text-3.5 sm:rounded-2xl sm:text-4"
          />
          <div class="flex flex-col inview-2 gap-8 *:w-fit">
            <p class="text-4 leading-relaxed md:text-5">{data.description}</p>
            <Button
              as="a"
              variant="secondary"
              href={t('index.features.custom.link')}
              target="_blank"
            >
              {t('index.features.custom.buttonText')}
            </Button>
          </div>
        </div>
        <div class="flex flex-col gap-6">
          <div class="inview-1 c-accent">{t('index.features.custom.normal.title')}</div>
          <div class="inview-1">
            {first}
            <span class="text-primary underline decoration-dashed font-bold">
              Maple Mono Normal
            </span>
            {second}
          </div>
          <div class="inview-1 c-note">{t('index.features.custom.normal.enable')}:</div>
          <Code
            code={`"${normalFeatureArray.join('", "')}"`}
            class="inview-2 rounded-lg p-4 pb-2 text-3.5 sm:rounded-2xl sm:text-4"
          />
          <div class="inview-3 c-note">
            {t('index.features.custom.normal.preview')}
            or
            <Button as="a" href={playgroundLink} variant="outline">
              {t('index.features.custom.normal.testInPlayground')}
            </Button>
          </div>
          <Code
            code={normalCode}
            theme={mapleTheme}
            style={Object.fromEntries(normalFeatureArray.map((f) => [`--feat-${f}`, 1]))}
            lang="typescript"
            class="inview-4 rounded-lg p-4 text-3.5 sm:rounded-2xl sm:text-4"
          />
        </div>
      </SubSectionTitle>
    </>
  )
}
