import { Button, Checkbox, Dialog, useCn } from 'moraine'
import { createMemo, createSignal, For, onCleanup } from 'solid-js'

import Icon from '@/components/icon'
import { useI18n } from '@/locales/i18n'
import type { ExtraConfig, ExtraConfigKey } from '@/utils/feature'
import { toCliFlag, toConfigJson } from '@/utils/feature'

import GuideLink from '../components/guide-link'

export interface ConfigActionDialogProps {
  features: Record<string, '0' | '1'>
  width: 'default' | 'narrow' | 'slim'
}

function ConfigSection(props: {
  type: 'cli' | 'json'
  title: string
  feat: ConfigActionDialogProps['features']
  width: ConfigActionDialogProps['width']
  fallback: string
  extra: ExtraConfig
}) {
  const cn = useCn()
  const [isCopied, setCopied] = createSignal(false)
  let textareaRef!: HTMLTextAreaElement
  let timer: ReturnType<typeof setTimeout> | undefined
  let disposed = false
  onCleanup(() => {
    disposed = true
    clearTimeout(timer)
  })

  async function copyTextArea() {
    const val = textareaRef.value
    if (!val || !navigator.clipboard) {
      return
    }
    await navigator.clipboard.writeText(val)
    if (disposed) {
      return
    }
    setCopied(true)
    clearTimeout(timer)
    timer = setTimeout(() => setCopied(false), 1500)
  }

  const parsedText = createMemo(() =>
    props.type === 'cli'
      ? toCliFlag(props.feat, props.width, props.extra)
      : toConfigJson(props.feat, props.width, props.extra).replace(
          '"scale_factor": 1',
          '"scale_factor": 1.0',
        ),
  )

  return (
    <>
      <h2 class="mb-2 flex select-none items-center gap-2">
        <div class="c-accent sm:text-lg">{props.title}</div>
        <Button
          size="icon-lg"
          variant="outline"
          disabled={!parsedText() || isCopied()}
          class={['border-0', (!parsedText() || isCopied()) && 'cursor-not-allowed']}
          onClick={() => void copyTextArea().catch(console.error)}
        >
          <Icon name={isCopied() ? 'lucide:copy-check' : 'lucide:copy'} title="copy" />
        </Button>
      </h2>
      <textarea
        ref={(element) => (textareaRef = element)}
        name={props.type}
        title={props.title}
        disabled={!parsedText()}
        class={cn(
          'w-full resize-none bg-#0000 !b-0 !outline-none',
          props.type === 'json' && 'h-40 sm:h-60',
          props.type === 'cli' && 'h-10 whitespace-nowrap',
        )}
        prop:value={parsedText() || props.fallback}
      >
        {parsedText() || props.fallback}
      </textarea>
    </>
  )
}

const EXTRA_KEYS: ExtraConfigKey[] = ['nf', 'cn', 'hinted', 'normal']

export default function ConfigActionDialog(props: ConfigActionDialogProps) {
  const { t } = useI18n()
  const [extraConfig, setExtraConfig] = createSignal<ExtraConfig>({
    nf: true,
    cn: false,
    hinted: true,
    normal: false,
  })

  return (
    <Dialog>
      <Dialog.Trigger as={Button} size="md" class="w-full px-2">
        <Icon name="lucide:braces" class="mr-2" />
        {t('playground.action.config.btnText')}
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title class="flex items-center text-primary">
          <Icon name="lucide:braces" class="mr-2 size-6 c-accent" />
          {t('playground.action.config.title')}
        </Dialog.Title>
        <div>
          <p class="text-sm">
            {t('playground.action.config.description')}
            <GuideLink
              text={t('playground.action.guide.text')}
              link={t('playground.action.guide.link')}
            />
          </p>
          <div class="grid my-6 gap-3 sm:(grid-cols-2 my-6)">
            <For each={EXTRA_KEYS}>
              {(key) => (
                <Checkbox
                  checked={extraConfig()[key]}
                  onCheckedChange={(v) =>
                    setExtraConfig((old) => ({
                      ...old,
                      [key]: v,
                    }))
                  }
                  class="flex items-center space-x-2"
                  label={t(`playground.action.config.extra.${key}`)}
                />
              )}
            </For>
          </div>
          <ConfigSection
            type="cli"
            title={t('playground.action.config.cliFlags')}
            feat={props.features}
            width={props.width}
            fallback={t('playground.action.config.noNeed')}
            extra={extraConfig()}
          />
          <ConfigSection
            type="json"
            title="config.json"
            feat={props.features}
            width={props.width}
            fallback={t('playground.action.config.noNeed')}
            extra={extraConfig()}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  )
}
