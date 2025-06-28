import { createSignal } from 'solid-js'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

import GuideLink from '../components/guide-link'

export interface Props {
  $shouldLoad: () => any
}

export default function LoadCnDialog(props: Props) {
  const [isOpen, setIsOpen] = createSignal(true)
  return (
    <Dialog open={isOpen()} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle class="flex items-center text-primary">
          <Icon name="lucide:lightbulb" class="mr-2 size-6 c-accent" />
          提示
        </DialogTitle>
        <div class="mt-2">
          是否加载中文字体？
        </div>
        <div class="text-sm">
          (也可以之后点击右侧或上侧的“加载中文字体”按钮手动加载)
        </div>
        <div class="text-sm c-note">
          感谢
          {' '}
          <GuideLink
            text="ZeoSeven Fonts"
            link="https://fonts.zeoseven.com/items/442/"
          />
          {' '}
          提供的 CDN 资源，
          <GuideLink
            text="打赏"
            link="https://zeoseven.com/donate/"
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              props.$shouldLoad()
              setIsOpen(false)
            }}
          >
            加载
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
