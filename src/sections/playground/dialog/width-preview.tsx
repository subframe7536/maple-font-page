import type { ConfigActionDialogProps } from './config'
import type { FeatureState } from '@/utils/feature'

import { cls } from 'cls-variant'
import { createMemo, For, Show } from 'solid-js'

import Icon from '@/components/icon'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
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
  Narrow: '-0.1em',
  Slim: '-0.17em',
}

function PreviewLine(props: { line: string, width: string }) {
  const segments = createMemo(() => segmentText(props.line))

  return (
    <div class="min-h-1em whitespace-pre">
      <For each={segments()}>
        {seg => (
          <Show
            when={seg.isCJK}
            fallback={(
              <span
                class={cls(
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
      <DialogContent class="max-h-80vh max-w-3xl">
        <DialogTitle class="flex items-center text-primary">
          <Icon name="lucide:scan-text" class="mr-3 size-6 c-accent" />
          {props.width}
          {' '}
          预览
        </DialogTitle>
        <DialogDescription>
          使用 CSS 模拟，可能会有误差或者连字不生效，实际使用时中英文宽度2：1 ；同时由于浏览器渲染机制限制，目前无法实时显示。
        </DialogDescription>
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
      </DialogContent>
    </Dialog>
  )
}
