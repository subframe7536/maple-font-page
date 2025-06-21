import Icon from '@/components/icon'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

export interface Props {
  title: string
  content: string
  reload: string
}

export default function LoadErrorDialog(props: Props) {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogTitle class="flex items-center text-primary">
          <Icon name="lucide:circle-alert" class="mr-2 size-6 c-red" />
          {props.title}
        </DialogTitle>
        <div>
          {props.content}
        </div>
        <DialogFooter>
          <Button onClick={() => location.reload()}>
            {props.reload}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
