import { For } from 'solid-js'

import samples from '@/assets/code-samples'
import Section from '@/components/section'
import { useIndexTranslation } from '@/locales/i18n'
import { siteLocale } from '@/locales/i18n'

import CodePanel from './code-panel'

export default function SectionView() {
  const { subTitle, title } = useIndexTranslation(siteLocale(), 'preview')

  const data = {
    id: 'preview',
    title,
    subTitle,
  }

  const tsxCode = samples.tsxCode

  const vueCode = samples.vueCode

  const javaCode = samples.javaCode

  const goCode = samples.goCode

  const pythonCode = samples.pythonCode

  const cppCode = samples.cppCode

  const items = [
    {
      lang: 'tsx',
      title: 'TypeScript JSX',
      code: tsxCode,
    },
    {
      lang: 'vue',
      title: 'Vue',
      code: vueCode,
    },
    {
      lang: 'java',
      title: 'Java',
      code: javaCode,
    },
    {
      lang: 'go',
      title: 'Go',
      code: goCode,
    },
    {
      lang: 'python',
      title: 'Python',
      code: pythonCode,
    },
    {
      lang: 'cpp',
      title: 'C++',
      code: cppCode,
    },
  ] as const
  return (
    <>
      <Section {...data}>
        <div class="grid grid-cols-1 gap-(col-8 row-4) md:grid-cols-2">
          <For each={items}>{info => <CodePanel {...info} />}</For>
        </div>
      </Section>
    </>
  )
}
