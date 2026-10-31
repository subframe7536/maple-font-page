# Maple Mono

Landing page for [Maple Mono](https://github.com/subframe7536/maple-font)

### TODO

- [x] Add `--normal` preset button or switch (Through URL search param)
- [ ] Detailed configuration guide
- [ ] Font choose guide
- [x] In-browser OpenType feature freeze

### Development

Use Node.js 24 and pnpm (the version is pinned in `package.json`).
TypeScript 7 checks types; Oxlint and Oxfmt use `@subf/config` for linting and
formatting. Run `pnpm format` to apply formatting.

```sh
pnpm install
pnpm dev
```

The site uses Solid, Moraine, UnoCSS and `solid-file-router`. Markdown/MDX is
compiled with the router's Satteri pipeline; Shiki runs at build time.
Translations use `@solid-primitives/i18n`: each namespace in `src/locales/<namespace>/`
has an `en.ts` and a `zh-cn.ts` dictionary, and components read them with
`const { t } = useI18n()` and dot-path keys such as `t('nav.titles.usage')`.
[x18n](https://x18n.dev) checks the locale files and the `t` calls for missing,
unused and mismatched keys (`pnpm i18n:check`).

```sh
pnpm check
pnpm lint
pnpm format:check
pnpm i18n:check
pnpm build
pnpm test:ssg
pnpm preview
```

Deploy **`dist/client`** to a static server. `dist/server` is used only during
prerendering. The build preserves directory URLs and writes language metadata,
a sitemap and robots files. For a GitHub Pages project path:

```sh
BASE_PATH=/maple-font-page/ VITE_SITE_ORIGIN=https://subframe7536.github.io pnpm build
BASE_PATH=/maple-font-page/ VITE_SITE_ORIGIN=https://subframe7536.github.io pnpm test:ssg
```

The tag-triggered Pages workflow sets these values from `configure-pages`.
The in-browser font patcher retains the existing Fonttools/Pyodide worker and
loads its Python runtime from esm.sh and unpkg on demand. The Chinese font
continues to load on request from ZeoSeven Fonts.

Implementation references:
[Dev Toolkit](https://github.com/subframe7536/dev-toolkit),
[Moraine docs](https://github.com/subframe7536/moraine/tree/main/docs),
[Solid Primitives i18n](https://primitives.solidjs.community/package/i18n), and
[x18n's solid-primitives-i18n preset](https://x18n.dev/presets/solid-primitives-i18n).
