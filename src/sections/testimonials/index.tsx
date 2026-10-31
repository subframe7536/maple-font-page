import Section from '@/components/section'
import { useI18n } from '@/locales/i18n'

import { TestimonialBanner } from './testimonial-banner'

const TESTIMONIALS = ['siddharth', 'techEnthusiast', 'nero', 'beiyanyunyi', 'ezRoma'] as const

export default function SectionView() {
  const { t } = useI18n()
  const data = {
    id: 'testimonials',
    title: t('index.testimonial.title'),
    subTitle: t('index.testimonial.subTitle'),
  }
  const items = TESTIMONIALS.map((id) => ({
    content: t(`index.testimonial.items.${id}.content`),
    author: t(`index.testimonial.items.${id}.author`),
    platform: t(`index.testimonial.items.${id}.platform`),
  }))
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
