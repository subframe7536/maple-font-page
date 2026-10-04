// MDX code fences are also highlighted by Shiki at build time, never from user input.
export function CodeHtml(props: { html: string }) {
  // oxlint-disable-next-line subf/solid-no-innerhtml
  return <div innerHTML={props.html} />
}
