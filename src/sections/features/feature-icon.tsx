import { For } from 'solid-js'

import Zsh from '@/assets/img/zsh.webp'
import ExternalLink from '@/components/external-link'
import { useFeatureTranslation, siteLocale } from '@/locales/i18n'

import SubSection from './part/sub-section'

export default function SectionView() {
  const { description, ref, title } = useFeatureTranslation(siteLocale(), 'icon')

  const data = {
    title,
    description,
    icon: 'lucide:terminal',
  } as const

  interface ReferenceData {
    title: string
    name: string
    href: string
  }

  const references: ReferenceData[] = [
    {
      title: ref.artBy,
      name: 'CodeImg',
      href: 'https://github.com/subframe7536/vscode-codeimg',
    },
    {
      title: ref.theme,
      name: 'Maple',
      href: 'https://github.com/subframe7536/vscode-theme-maple',
    },
    {
      title: ref.prompt,
      name: 'Starship',
      href: 'https://starship.rs',
    },
  ]
  return (
    <>
      <SubSection {...data}>
        <img
          src={Zsh}
          alt="Nerd-Font showcase image"
          class="w-full inview-2 rounded-lg sm:rounded-2xl"
        />
        <div class="mx-auto mt-8 flex flex-row inview-3 justify-evenly xs:gap-4">
          <For each={references}>
            {(props) => <ExternalLink title={props.title} links={[[props.name, props.href]]} />}
          </For>
        </div>
      </SubSection>
    </>
  )
}
