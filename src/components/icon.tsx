import { Icon as MoraineIcon } from 'moraine'
export interface Props { name: `lucide:${string}`, class?: string, title?: string }
export default function Icon(props: Props) {
  return <MoraineIcon name={`i-${props.name}`} class={props.class} title={props.title} />
}
