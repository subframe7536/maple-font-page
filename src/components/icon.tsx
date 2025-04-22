import type json from '@iconify-json/lucide/icons.json'

export interface Props {
  name: `lucide:${keyof typeof json['icons']}`
  class?: string
}

export default function Icon(props: Props) {
  return <div class={`i-${props.name} ${props.class}`} />
}
