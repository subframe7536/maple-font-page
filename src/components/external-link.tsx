import { Button } from 'moraine'
import type { ParentProps } from 'solid-js'
import { For } from 'solid-js'

import Icon from './icon'

export interface Props extends ParentProps {
  title: string
  links: [name: string, href: string][]
}

export default function SectionView(props: Props) {
  return (
    <>
      <div class="flex flex-col">
        <div class="mb-3 text-lg c-primary font-(italic 500)">{props.title}</div>
        <div class="flex flex-col gap-2">
          <For each={props.links}>
            {([name, href]) => (
              <Button as="a" variant="link" href={href} target="_blank" class="parent ml--4 w-fit">
                {name}
                <Icon
                  name="lucide:external-link"
                  class="ml-1 c-secondary transition parent-hover:translate-(x-.5 y--.5)"
                />
              </Button>
            )}
          </For>
        </div>
      </div>
    </>
  )
}
