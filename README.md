# vite-vue3-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

```
vite-vue3-project
├─ .editorconfig
├─ .env
├─ .env.development
├─ .env.production
├─ .env.test
├─ .git
├─ .gitignore
├─ .husky
├─ .prettierrc.json
├─ .stylelintignore
├─ .stylelintrc.json
├─ bundle-stats.html
├─ commitlint.config.mjs
├─ cz.config.cjs
├─ env.d.ts
├─ eslint.config.mjs
├─ index.html
├─ package.json
├─ pnpm-lock.yaml
├─ public
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  ├─ components
│  ├─ hooks
│  ├─ locales
│  ├─ main.ts
│  ├─ router
│  ├─ stores
│  ├─ types
│  ├─ utils
│  └─ views
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
├─ tsconfig.vitest.json
├─ types
│  ├─ auto-imports.d.ts
│  └─ components.d.ts
├─ vite.config.ts
└─ vitest.config.ts

```
