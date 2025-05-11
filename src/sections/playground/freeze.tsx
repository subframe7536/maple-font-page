import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { createSignal } from 'solid-js'

interface Props {
  translate: PlaygroundTranslation['action']['build']
}

export default function FreezeAction(props: Props) {
  const [open, setOpen] = createSignal(false)
  return (
    <Dialog open={open()} onOpenChange={setOpen}>
      <DialogTrigger
        as={(triggerProps: DialogTriggerProps) => (
          <Button
            size="md"
            class="w-full !px-2"
            variant="secondary"
            {...triggerProps}
          >
            <Icon name="lucide:hammer" class="mr-2" />
            {props.translate.btnText}
          </Button>
        )}
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle class="text-secondary">
            {props.translate.title}
          </DialogTitle>
        </DialogHeader>
        <div>
          🚧 WIP
        </div>
        <DialogFooter>
          <Button class="cursor-not-allowed">{props.translate.download}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
