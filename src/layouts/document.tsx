import type { ParentProps } from 'solid-js'

import { Show } from 'solid-js'

import DownloadLayout from './download'
export default function DocumentLayout(props: ParentProps<{ page: 'usage' | 'download' }>) {
  return (
    <Show when={props.page === 'download'} fallback={<div class="mx-auto min-h-screen max-w-4xl w-96% px-6 pt-20 pb-12 text-left prose xs:w-90%">{props.children}</div>}>
      <DownloadLayout>{props.children}</DownloadLayout>
    </Show>
  )
}
