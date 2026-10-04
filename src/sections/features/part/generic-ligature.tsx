import { Tabs, useCn } from 'moraine'
/* oxlint-disable subf/solid-prefer-for */
import { createSignal } from 'solid-js'

const arr = [
  ['<>', '??', '!==', '...', '|->'],
  ['<!--', '++', '!!', '~>', '</>'],
  ['<=', '###', ':=', '<==>', '|>'],
]
export default function GenericLigature() {
  const cn = useCn()
  const [calt, setCalt] = createSignal('1')
  return (
    <div class="relative w-full xs:w-fit">
      <Tabs
        value={calt()}
        onChange={setCalt}
        class="max-w-80 w-full"
        aria-label="calt"
        items={[
          { value: '1', label: 'Ligature ON' },
          { value: '0', label: 'Ligature OFF' },
        ]}
      />
      <div
        class={cn(
          'mt-8 flex flex-col gap-6 text-3xl c-muted lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl',
          calt() === '1' ? '[&_span]:c-secondary' : '[&_span]:c-secondary-alt',
        )}
        style={{
          '--feat-calt': calt(),
        }}
      >
        {arr.map((row, i) => (
          <div class="whitespace-nowrap">
            {row.map((item, j) => {
              const char = j ? String.fromCodePoint(97 + i * 4 + j - 1) : ''
              return (
                // MUST be `<>{char}<span>{item}</span></>` to remove space
                // prettier-ignore
                <>{char}<span>{item}</span></>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
