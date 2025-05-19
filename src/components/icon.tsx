import type json from '@iconify-json/lucide/icons.json'

import { cls } from 'cls-variant'

export interface Props {
  name: `lucide:${keyof typeof json['icons']}`
  class?: string
  title?: string
}

export default function Icon(props: Props) {
  return <div class={cls(`i-${props.name}`, props.class)} title={props.title || props.name} />
}
