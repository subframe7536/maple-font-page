import { defineHastPlugin, defineMdastPlugin } from 'satteri'
import type { ThemeRegistration } from 'shiki'
import { codeToHtml } from 'shiki'

import theme from '../src/assets/maple-dark-color-theme.json' with { type: 'json' }

// Follow Moraine's Satteri pipeline: compile highlighted code at build time.
export function markdownPlugins(base: string) {
  return {
    features: { gfm: true, frontmatter: true },
    mdastPlugins: [
      () =>
        defineMdastPlugin({
          name: 'maple-code',
          async code(node, ctx) {
            const html = await codeToHtml(node.value, {
              lang: node.lang ?? 'text',
              theme: theme as unknown as ThemeRegistration,
            })
            ctx.replaceNode(node, {
              type: 'mdxJsxFlowElement',
              name: 'CodeHtml',
              children: [],
              attributes: [
                {
                  type: 'mdxJsxAttribute',
                  name: 'html',
                  value: { type: 'mdxJsxAttributeValueExpression', value: JSON.stringify(html) },
                },
              ],
            })
          },
        }),
    ],
    hastPlugins: [
      () => {
        const ids = new Map<string, number>()
        return defineHastPlugin({
          name: 'maple-headings',
          element: [
            {
              filter: ['a'],
              visit(node, ctx) {
                const href = node.properties?.href
                if (typeof href === 'string' && /^\/(?:en|zh-cn)(?:\/|$)/.test(href)) {
                  ctx.setProperty(node, 'href', `${base}${href.slice(1)}`)
                }
              },
            },
            {
              filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
              visit(node, ctx) {
                const base = ctx
                  .textContent(node)
                  .trim()
                  .toLowerCase()
                  .replace(/[^\p{L}\p{N}\s-]/gu, '')
                  .replace(/\s+/g, '-')
                const count = ids.get(base) ?? 0
                ids.set(base, count + 1)
                ctx.setProperty(node, 'id', count ? `${base}-${count}` : base)
              },
            },
          ],
        })
      },
    ],
  }
}
