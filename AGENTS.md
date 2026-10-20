# AGENTS.md

## What this repo is

Storybook for the `@nanojjg/nano-ui-components` Angular component library.
Stack: Angular 22 + Storybook 10 (`@storybook/angular-vite`, Vite 8 + `@analogjs/vite-plugin-angular`, JIT mode).

- `src/stories/<kebab-name>/nano-<kebab-name>.stories.ts` — the real deliverables, one folder per library component.
- `.storybook/` — `main.ts` (story glob + framework + Vite tweaks), `preview.ts` (global preview params + theme CSS), `tsconfig.json` (the tsconfig the Angular/Vite plugin compiles with), `typings.d.ts`.
- There is **no Angular app** in this workspace: `src/app`, `src/main.ts`, `src/index.html`, `tsconfig.app.json` and `tsconfig.spec.json` were removed. `angular.json` only has the `storybook` and `build-storybook` targets.
- Sibling repos on the same machine (`D:\Repos\NanoUI-cosas\`): `nano-ui-components` (the library, published to npm), `nano-ui-web` (demo app), `components` (loose copies of the story files this repo was seeded from).

## Commands

| Task | Command |
| --- | --- |
| Storybook dev server, **port 6006** | `npm run storybook` (another port: `npx ng run storybook:storybook --port 6007`) |
| Static build → `dist/` (gitignored) | `npm run build` (`build-storybook` is an alias) |
| Typecheck the stories | `npx tsc -p .storybook/tsconfig.json --noEmit` (there is **no** npm script for this) |
| Format | `npx prettier --write <files>` — no npm script; `.prettierrc` = printWidth 100, single quotes, angular parser for `.html` |
| Serve the build | `npx serve dist` (or any static server) |

There is no `npm test` / `ng test` target any more (the app and its spec are gone).

## Consuming the component library — the usual breakage

- Components come from the npm package `@nanojjg/nano-ui-components` (published from the sibling repo, currently `0.2.5`). It is **not** listed in this repo's `package.json` dependencies and is missing from `node_modules`: add it with `npm i @nanojjg/nano-ui-components`.
- Always import from the package root:

  ```ts
  import { NanoAlertComponent } from '@nanojjg/nano-ui-components';
  ```

  The published `exports` map only exposes `"."` and `"./themes.css"`. Deep paths (`@nanojjg/nano-ui-components/alert/nano-alert`) and the `@nano/...` scope do not exist → `TS2307` in the editor and *Failed to fetch dynamically imported module* in the browser.
- Never point a tsconfig `paths` entry at the package's TypeScript sources (e.g. `.../nano-ui-components/src/public-api.ts`). Vite's dependency optimizer pre-bundles anything resolved inside `node_modules` without the Angular compiler, so raw `@Component()` decorators reach the browser → `SyntaxError: Invalid or unexpected token` and a blank preview. The package must ship the ng-packagr build (FESM).
- **Three settings keep the component metadata alive** — remove any of them and every story dies with `TypeError: Cannot read properties of undefined (reading 'selector')`:
  1. `.storybook/main.ts` → `optimizeDeps.include: ['@angular/core']`. Otherwise Vite inlines `@angular/core` into a shared chunk, so Storybook's renderer chunk and the component library end up with two different copies of `@angular/core`; the renderer finds the component through `d instanceof Component` (`computesTemplateFromComponent` in `@storybook/angular-vite`), and that check fails across copies. The same duplication surfaces as `NG0203: The EnvironmentInjector token injection failed` or `NG0912: Component ID generation collision detected`.
  2. `.storybook/main.ts` → `mode: 'development'`. A production compilation enables the Angular advanced optimizations, which mark the library's top-level `ɵɵngDeclareClassMetadata(...)` call as pure so the bundler drops it.
  3. `angular.json` → `enableProdMode: false` on both storybook targets. Otherwise Storybook injects `preview-prod`, which calls Angular's `enableProdMode()` at runtime and sets `ngDevMode = false`, so the metadata call's `(typeof ngDevMode === "undefined" || ngDevMode)` guard is never satisfied.
- Several stories copied from `..\components` still import `@nano/nano-ui-components/<component>/<file>`; that specifier does not exist. Rewrite them to the package-root import before expecting a green build — otherwise `npm run build` dies with `[vite]: Rolldown failed to resolve import "@nano/nano-ui-components/…"`.

## Releasing a new library version (sibling repo `..\nano-ui-components`)

1. `npm version patch --no-git-tag-version` (updates `package.json` + `package-lock.json`).
2. Commit the bump.
3. Tag with the `v` prefix — `v0.2.6` — and push both `main` and the tag. The `Publish Package` GitHub Actions workflow (`npm-publish` environment) builds with ng-packagr and publishes `./dist` through npm trusted publishing (OIDC, no token). The workflow fails if the tag version ≠ `package.json` version.
4. Here, bump the dependency and `npm install` to pick up the new version.

## Story conventions

- Shape: `title: 'Components/<Name>'`, `component`, `decorators: [moduleMetadata({ imports: [XComponent] })]` (required so the standalone component is usable inside `render` templates), `tags: ['autodocs']`, `args`/`argTypes`.
- The element selectors are `nano-*` (`<nano-button>`, `<nano-card>`, …) — there is no `ui-*` alias; `ui-*` renders as an unknown element (`NG0304`).
- `TableColumn.render` must return `string | HTMLElement` (per the published types). Returning an `SVGElement` is a type error, and `isHTMLElement()` is `false` for it. Known library gap: `nano-table.html` never instantiates the `#htmlContent`/`#textContent` templates, so a column with a `render` function shows an **empty cell** — the custom output is dropped by the library, not by the story.
- `.storybook/main.ts` globs `../src/**/*.stories.@(js|jsx|mjs|ts|tsx)`; its `addons` array is empty — `@storybook/addon-docs` / `@storybook/addon-a11y` are **not** installed, so `autodocs` currently yields no Docs page. Install and register them if docs/a11y output is expected.
- Theme tokens live in `@nanojjg/nano-ui-components/themes.css` (dark by default; `data-theme="light"` on the document root switches to light). Components fall back to hardcoded colors when it isn't imported — add `import '@nanojjg/nano-ui-components/themes.css'` to `.storybook/preview.ts` to render with the real theme.

## Verifying a story change

1. `npx tsc -p .storybook/tsconfig.json --noEmit` → must be clean; this is what catches wrong import specifiers.
2. `npm run storybook`, then open the story. An unresolvable module shows *Failed to fetch dynamically imported module*; a component that throws shows the error overlay.
3. The preview renders inside the preview iframe (`iframe.html?id=...`) — inspect the DOM inside that frame, not the top document.
