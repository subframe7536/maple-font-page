import { Button, Dialog } from 'moraine'

import Icon from '@/components/icon'

export interface Props {
  title: string
  content: string
  reload: string
}

export default function LoadErrorDialog(props: Props) {
  return (
    <Dialog defaultOpen>
      <Dialog.Content>
        <Dialog.Title class="flex items-center text-primary">
          <Icon name="lucide:circle-alert" class="mr-2 size-6 c-red" />
          {props.title}
        </Dialog.Title>
        <div>
          {props.content}
        </div>
        <Dialog.Footer>
          <Button onClick={() => location.reload()}>
            {props.reload}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  )
}
