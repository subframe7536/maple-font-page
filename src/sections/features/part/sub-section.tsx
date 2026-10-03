import type { ParentProps } from 'solid-js'

import SubSectionTitle from './sub-section-title'

interface Props extends ParentProps {
  title: string
  description: string
  icon: `lucide:${string}`
}

export default function SectionView(props: Props) {
  return (
    <>
      <SubSectionTitle icon={props.icon} title={props.title}>
        <p class="inview-2 text-lg md:text-xl">
          {props.description}
        </p>
        <div class="inview-3">
          {props.children}
        </div>
      </SubSectionTitle>
    </>
  )
}
