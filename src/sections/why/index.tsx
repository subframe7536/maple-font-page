import './image.css'

import { Show } from 'solid-js'

import Section from '@/components/section'
import { useI18n } from '@/locales/i18n'

import Reason from './reason.mdx'
import ReasonCN from './reason_cn.mdx'

export default function SectionView() {
  const { locale, t } = useI18n()

  const data = {
    id: 'why',
    title: t('index.why.title'),
  }
  return (
    <>
      <Section {...data}>
        <div class="inview-2 text-xl leading-relaxed prose">
          <Show when={locale() === 'zh-cn'} fallback={<Reason />}>
            <ReasonCN />
          </Show>
        </div>
      </Section>
    </>
  )
}
