import type { JSX } from 'solid-js'
import highlighted from 'virtual:code-highlights'
export default function Code(props: {
  code: string
  lang?: string
  theme?: unknown
  class?: string
  style?: JSX.CSSProperties
}) {
  return (
    <div
      class={`code-panel ${props.class ?? ''}`}
      style={props.style}
      // Shiki generates this HTML from checked-in code samples at build time.
      // oxlint-disable-next-line subf/solid-no-innerhtml
      innerHTML={highlighted[`${props.lang ?? 'text'}:${props.code}`]}
    />
  )
}
