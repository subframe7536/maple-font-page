import type { PlaygroundTranslation } from '@/locales/playground/en'

import { cls } from 'cls-variant'

export default function GuideLink(
  props: PlaygroundTranslation['action']['guide'] & { class?: string },
) {
  return (
    <a
      href={props.link}
      target="_blank"
      class={cls('w-full text-secondary font-bold xs:w-fit hover:underline', props.class)}
      title={props.text}
    >
      {props.text}
    </a>
  )
}
