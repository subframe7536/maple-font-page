import Section from '@/components/section'
import { useIndexTranslation } from '@/locales/i18n'
import { siteLocale } from '@/locales/i18n'

import { TestimonialBanner } from './testimonial-banner'

export default function SectionView() {
  const { items, subTitle, title } = useIndexTranslation(siteLocale(), 'testimonial')
  const data = {
    id: 'testimonials',
    title,
    subTitle,
  }
  return (
    <>
      <Section {...data}>
        <div class="mx-auto">
          <TestimonialBanner items={items} />
        </div>
      </Section>
    </>
  )
}
