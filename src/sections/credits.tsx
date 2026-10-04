import type { Props as ExternalLinkProps } from '@/components/external-link'
import ExternalLink from '@/components/external-link'
import Section from '@/components/section'
import { useIndexTranslation, siteLocale } from '@/locales/i18n'

export default function SectionView() {
  const { subTitle, title, items } = useIndexTranslation(siteLocale(), 'credits')

  const data = {
    id: 'credits',
    title,
    subTitle,
  }

  const creaditData: ExternalLinkProps[] = [
    {
      title: items.base,
      links: [['JetBrains Mono', 'https://github.com/JetBrains/JetBrainsMono']],
    },
    {
      title: items.icon,
      links: [['Nerd Fonts', 'https://github.com/ryanoasis/nerd-fonts']],
    },
    {
      title: items.cn,
      links: [['Resource Han Rounded', 'https://github.com/CyanoHao/Resource-Han-Rounded']],
    },
    {
      title: items.inspiration,
      links: [
        ['Commit Mono', 'https://github.com/eigilnikolajsen/commit-mono'],
        ['Fira Code', 'https://github.com/tonsky/FiraCode'],
        ['Iosevka', 'http://be5invis.github.io/Iosevka'],
        ['Monaspace', 'https://monaspace.githubnext.com/'],
        ['Monolisa', 'https://monolisa.dev'],
        ['Recursive', 'https://www.recursive.design/'],
        ['Roboto Mono', 'https://github.com/googlefonts/RobotoMono'],
        ['Victor Mono', 'https://rubjo.github.io/victor-mono/'],
      ],
    },
    {
      title: items.font,
      links: [
        ['Fonttools', 'https://github.com/fonttools/fonttools'],
        ['FoundryTools-CLI', 'https://github.com/ftCLI/FoundryTools-CLI'],
        ['Pyodide', 'https://pyodide.org/en/stable/index.html'],
      ],
    },
    {
      title: items.web,
      links: [
        ['Moraine', 'https://moraine.subf.dev'],
        ['solid-file-router', 'https://github.com/subframe7536/solid-file-router'],
        ['Intlayer', 'https://intlayer.org'],
        ['SolidJS', 'https://solidjs.com'],
        ['UnoCSS', 'https://unocss.dev'],
        ['ESM.sh', 'https://esm.sh'],
      ],
    },
  ]
  return (
    <>
      <Section {...data}>
        <div class="grid grid-cols-1 w-full gap-4 md:grid-cols-3 sm:grid-cols-2 *:min-w-18">
          <div class="row-span-1 c-accent md:row-span-2">
            <ExternalLink {...creaditData[0]} />
          </div>
          <div class="row-span-1 md:(row-span-2 col-start-1 row-start-3)">
            <ExternalLink {...creaditData[1]} />
          </div>
          <div class="row-span-1 md:(row-span-2 col-start-1 row-start-5)">
            <ExternalLink {...creaditData[2]} />
          </div>
          <div class="row-span-2 md:(row-span-6 col-start-2 row-start-1)">
            <ExternalLink {...creaditData[3]} />
          </div>
          <div class="row-span-1 md:(row-span-3 col-start-3 row-start-1)">
            <ExternalLink {...creaditData[4]} />
          </div>
          <div class="row-span-1 md:(row-span-3 col-start-3 row-start-4)">
            <ExternalLink {...creaditData[5]} />
          </div>
        </div>
      </Section>
    </>
  )
}
