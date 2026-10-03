import type { PlaygroundTranslation } from '@/locales/playground/en'

import { useCn } from 'moraine'

export default function GuideLink(
  props: PlaygroundTranslation['action']['guide'] & { class?: string },
) {
  const cn = useCn()
  return (
    <a
      href={props.link}
      target="_blank"
      class={cn('w-full text-secondary font-bold xs:w-fit hover:underline', props.class)}
      title={props.text}
    >
      {props.text}
    </a>
  )
}
