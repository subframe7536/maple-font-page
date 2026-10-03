// MDX code fences are also highlighted by Shiki at build time, never from user input.
export function CodeHtml(props: { html: string }) {
  // eslint-disable-next-line solid/no-innerhtml
  return <div innerHTML={props.html} />
}
