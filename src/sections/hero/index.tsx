import Icon from '@/components/icon'
import Section from '@/components/section'
import { Button } from '@/components/ui/button'
import { useIndexTranslation } from '@/locales/i18n'
import { localePath, siteLocale } from '@/locales/i18n'

import Title from './title'

export default function SectionView() {
  const {
    description,
    learnMoreText,
    slogan,
    tryItText,
  } = useIndexTranslation(siteLocale(), 'hero')
  const [beforeFont, afterFont] = description.split('Maple Mono')

  const locale = siteLocale()
  const playgroundLink = localePath(locale, 'playground')
  return (
    <>
      <Section
        id="hero"
        class="h-screen min-h-180 flex flex-col justify-center gap-2 xl:gap-4"
      >
        <Title slogan={slogan} />
        <p class="mt-4 py-4 text-4 leading-relaxed text-shadow-(sm color-input) md:text-5 xs:leading-[1.875]">
          {beforeFont}<span class="font-(italic 500)">Maple Mono</span>{afterFont}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-start gap-6">
          <Button as="a" href="#why" size="lg">
            {learnMoreText}
            <Icon name="lucide:arrow-down" class="ml-2" />
          </Button>
          <Button as="a" size="lg" href={playgroundLink} variant="outline">
            {tryItText}
            <Icon name="lucide:arrow-right" class="ml-2" />
          </Button>
        </div>
      </Section>
    </>
  )
}
