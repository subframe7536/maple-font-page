import { Switch, Tabs, useCn } from 'moraine'
import { createSignal } from 'solid-js'

interface Props {
  class?: string
}

const families = [
  'JetBrains Mono',
  'Fira Code',
  'Iosevka',
]

export default function ComparisonTabs(props: Props) {
  const cn = useCn()
  const [isItalic, setIsItalic] = createSignal(false)
  return (
    <div class={props.class}>
      <div class="relative">
        <Switch class="mb-4 flex items-center sm:(absolute right-0 top-1 z-1 mb-0)" checked={isItalic()} onCheckedChange={setIsItalic} label="Italic" />
        <Tabs
          defaultValue={families[0]}
          aria-label="Compare programming fonts"
          classes={{ list: 'max-w-5xl w-full sm:(max-w-70% min-w-fit) xs:max-w-90%' }}
          items={families.map(item => ({ value: item, label: item, content: (
            <div class={cn(
              'pr-0 max-w-5xl of-(x-scroll y-hidden)',
              'text-12 leading-16 h-32',
              'xs:(text-14 leading-20 h-42)',
              'sm:(text-21 leading-27 h-56)',
              'md:(text-26 leading-32 h-66)',
              'lg:(text-32 leading-38 h-78)',
              isItalic() && 'font-italic',
            )}
            >
              <div class="text-accent">Cloudflare</div><div style={{ '--ff': item }}>Cloudflare</div>
            </div>
          ) }))}
        />
      </div>
    </div>
  )
}
