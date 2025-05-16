import type { PlaygroundTranslation } from '@/locales/playground/en'

export default function GuideButton(props: PlaygroundTranslation['action']['guide']) {
  return (
    <a
      href={props.link}
      target="_blank"
      class="w-full text-secondary font-bold xs:w-fit hover:underline"
      title={props.text}
    >
      {props.text}
    </a>
  )
}
