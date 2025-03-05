import { createMemo, For } from 'solid-js'

export default function FontWeightShowcase(props: { animateText: string }) {
  const chars = createMemo(() => props.animateText.split(''))

  return (
    <div class="w-80% flex flex-col items-center">
      <div class="mt-4 flex text-6xl c-accent">
        <For each={chars()}>
          {(char, index) => (
            <span
              class="animate-wave-weight font-200"
              style={{
                'animation-delay': `${index() * 0.2}s`,
              }}
            >
              {char}
            </span>
          )}
        </For>
      </div>
    </div>
  )
}
