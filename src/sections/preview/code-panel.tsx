import type { ParentProps } from 'solid-js'

import mapleTheme from '@/assets/maple-dark-color-theme.json'
import Code from '@/components/code'

interface Props extends ParentProps {
  code: string
  title: string
  lang: 'tsx' | 'vue' | 'python' | 'java' | 'go' | 'rust' | 'cpp' | 'csharp'
}

export default function SectionView(props: Props) {
  return (
    <>
      <div class="inview-1">
        <div class="pb-4 text-xl">{props.title}</div>
        <Code
          class="rounded-lg p-4 text-sm"
          code={props.code}
          lang={props.lang}
          theme={mapleTheme as any}
        />
      </div>
    </>
  )
}
