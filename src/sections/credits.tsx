import type { Props as ExternalLinkProps } from '@/components/external-link'
import ExternalLink from '@/components/external-link'
import Section from '@/components/section'
import { useI18n } from '@/locales/i18n'

export default function SectionView() {
  const { t } = useI18n()

  const data = {
    id: 'credits',
    title: t('index.credits.title'),
    subTitle: t('index.credits.subTitle'),
  }

  const creaditData: ExternalLinkProps[] = [
    {
      title: t('index.credits.items.base'),
      links: [['JetBrains Mono', 'https://github.com/JetBrains/JetBrainsMono']],
    },
    {
      title: t('index.credits.items.icon'),
      links: [['Nerd Fonts', 'https://github.com/ryanoasis/nerd-fonts']],
    },
    {
      title: t('index.credits.items.cn'),
      links: [['Resource Han Rounded', 'https://github.com/CyanoHao/Resource-Han-Rounded']],
    },
    {
      title: t('index.credits.items.inspiration'),
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
      title: t('index.credits.items.font'),
      links: [
        ['Fonttools', 'https://github.com/fonttools/fonttools'],
        ['FoundryTools-CLI', 'https://github.com/ftCLI/FoundryTools-CLI'],
        ['Pyodide', 'https://pyodide.org/en/stable/index.html'],
      ],
    },
    {
      title: t('index.credits.items.web'),
      links: [
        ['Moraine', 'https://moraine.subf.dev'],
        ['solid-file-router', 'https://github.com/subframe7536/solid-file-router'],
        ['Solid Primitives i18n', 'https://primitives.solidjs.community/package/i18n'],
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
