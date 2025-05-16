import type { PlaygroundTranslation } from '@/locales/playground/en'
import type { DialogTriggerProps } from '@kobalte/core/dialog'

import { createSignal, Show } from 'solid-js'

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

import GuideButton from './guide-button'
import { checkModuleWorkerSupport } from './utils'

interface Props {
  translate: PlaygroundTranslation['action']['build']
  guide: PlaygroundTranslation['action']['guide']
}

let worker: Worker | null

export default function FreezeAction(props: Props) {
  const [open, setOpen] = createSignal(false)
  const [isSupportWorker, setIsSupportWorker] = createSignal<boolean>()
  function listenOpenChange(isOpen: boolean) {
    setOpen(isOpen)
    if (!worker) {
      if (isSupportWorker() === undefined) {
        setIsSupportWorker(checkModuleWorkerSupport())
      }
      if (isSupportWorker()) {
        worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
      }
    }
  }
  return (
    <Dialog open={open()} onOpenChange={listenOpenChange}>
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
          <DialogTitle class="flex items-center text-primary">
            <Show
              when={!isSupportWorker()}
              fallback={<Icon name="lucide:hammer" class="mr-2 size-6" />}
            >
              <Icon name="lucide:circle-x" class="mr-2 size-6 c-red" />
            </Show>
            {props.translate.title}
          </DialogTitle>
        </DialogHeader>
        <div class="py-4">
          <Show
            when={isSupportWorker()}
            fallback={(
              <>
                {props.translate.unsupported}
                <GuideButton {...props.guide} />
              </>
            )}
          >
            <div>
              🚧 WIP
            </div>
          </Show>
        </div>
        <DialogFooter>
          <Button
            disabled={!isSupportWorker()}
          >
            {props.translate.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
