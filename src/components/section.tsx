import type { ParentProps } from 'solid-js'

import { useCn } from 'moraine'

interface Props extends ParentProps {
  id: string
  class?: string
  title?: string
  subTitle?: string
}

export default function SectionView(props: Props) {
  const cn = useCn()
  return (
    <>
      <section
        id={props.id}
        class={cn(
          'no-inview:scroll-mt-12 mx-auto max-w-4xl w-96% xs:w-90% text-left *:px-6',
          props.title && 'flex flex-col gap-8 md:gap-12 mb-16 pt-20',
          props.class,
        )}
      >
        {
          props.title && (
            <h1 class="inview-1 text-4xl c-secondary font-bold">
              {props.title}
            </h1>
          )
        }
        {
          props.subTitle && (
            <p class="inview-2 text-xl c-note md:text-2xl">
              {props.subTitle}
            </p>
          )
        }
        <div class={cn(props.title && props.subTitle && 'inview-3')}>
          {props.children}
        </div>
      </section>
    </>
  )
}
