import type { ConfigActionDialogProps } from './config'
import type { FeatureState } from '@/utils/feature'

import { Dialog, useCn } from 'moraine'
import { createMemo, For, Show } from 'solid-js'

import Icon from '@/components/icon'
import { segmentText } from '@/utils/cjk'
import { toStyleObject } from '@/utils/feature'

export interface WidthPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  text: string
  width: ConfigActionDialogProps['width']
  fontWeight: number
  fontSize: number
  fontStyle: string
  features: FeatureState
}

const LETTER_SPACING: Record<string, string> = {
  narrow: '-0.1em',
  slim: '-0.17em',
}

function PreviewLine(props: { line: string, width: string }) {
  const cn = useCn()
  const segments = createMemo(() => segmentText(props.line))

  return (
    <div class="min-h-1em whitespace-pre">
      <For each={segments()}>
        {seg => (
          <Show
            when={seg.isCJK}
            fallback={(
              <span
                class={cn(
                  'inline-block origin-left',
                  props.width === 'narrow' ? 'scale-x-92' : 'scale-x-83',
                )}
              >
                {seg.text}
              </span>
            )}
          >
            <span style={{
              'letter-spacing': LETTER_SPACING[props.width],
              'margin-inline-start': LETTER_SPACING[props.width],
            }}
            >
              {seg.text}
            </span>
          </Show>
        )}
      </For>
    </div>
  )
}

export default function WidthPreviewDialog(props: WidthPreviewDialogProps) {
  const lines = createMemo(() => props.text.split('\n'))

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Content class="max-h-[80vh] sm:max-h-[80vh] max-w-3xl">
        <Dialog.Title class="flex items-center text-primary">
          <Icon name="lucide:scan-text" class="mr-3 size-6 c-accent" />
          {props.width}
          {' '}
          预览
        </Dialog.Title>
        <Dialog.Description>
          使用 CSS 模拟，可能会有误差或者连字不生效，实际使用时中英文宽度2：1 ；同时由于浏览器渲染机制限制，目前无法实时显示；如果中文字符显示异常，请等待字体加载完成。
        </Dialog.Description>
        <div
          class="of-auto rounded-lg p-2 font-liga font-cn"
          style={{
            '--fw': props.fontWeight,
            'font-size': `${props.fontSize}px`,
            'font-style': props.fontStyle,
            ...toStyleObject(props.features),
          }}
        >
          <For each={lines()}>
            {line => <PreviewLine line={line} width={props.width} />}
          </For>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
