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
compiled with the router's Satteri pipeline; Shiki runs at build time. Intlayer's
Vite plugin compiles the dictionaries in `src/locales/**/*.content.ts` for `en`
and `zh-CN`. Public URLs retain the original `/en/` and `/zh-cn/` spelling.

```sh
pnpm check
pnpm lint
pnpm format:check
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
[Moraine docs](https://github.com/subframe7536/moraine/tree/main/docs), and
[Intlayer's Vite + Solid guide](https://intlayer.org/doc/environment/vite-and-solid).
