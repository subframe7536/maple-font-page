import type { JSX } from 'solid-js'

import highlighted from 'virtual:code-highlights'
export default function Code(props: { code: string, lang?: string, theme?: unknown, class?: string, style?: JSX.CSSProperties }) {
  return (
    <div
      class={`code-panel ${props.class ?? ''}`}
      style={props.style}
      // Shiki generates this HTML from checked-in code samples at build time.
      // eslint-disable-next-line solid/no-innerhtml
      innerHTML={highlighted[`${props.lang ?? 'text'}:${props.code}`]}
    />
  )
}

// MDX code fences are also highlighted by Shiki at build time, never from user input.
export function CodeHtml(props: { html: string }) {
  // eslint-disable-next-line solid/no-innerhtml
  return <div innerHTML={props.html} />
}
