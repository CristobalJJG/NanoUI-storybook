# Storybook — `@nanojjg/nano-ui-components`

Storybook del design system `@nanojjg/nano-ui-components` (Angular 22 + Storybook 10 con `@storybook/angular-vite`).

Este workspace **solo contiene Storybook**: no hay aplicación Angular. Las historias viven en
`src/stories/<componente>/nano-<componente>.stories.ts` y el Storybook las compila con el
plugin de Angular en modo JIT.

## Comandos

```bash
npm install          # instala dependencias
npm run storybook    # servidor de desarrollo en http://localhost:6006
npm run build        # build estático del Storybook en ./dist
```

`npm run build-storybook` es un alias de `npm run build`.

Para servir el resultado del build:

```bash
npx serve dist       # o cualquier servidor estático
```

## Estructura

| Ruta | Contenido |
| --- | --- |
| `.storybook/main.ts` | Glob de historias, framework y ajustes de Vite (`viteFinal`) |
| `.storybook/preview.ts` | Parámetros globales del preview + CSS del tema |
| `.storybook/tsconfig.json` | tsconfig que compila el plugin de Angular |
| `src/stories/**` | Una carpeta por componente con su archivo `*.stories.ts` |
| `public/` | Estáticos copiados a la raíz del build |

## Notas importantes

- Los componentes se importan siempre desde la raíz del paquete:
  `import { NanoAlertComponent } from '@nanojjg/nano-ui-components';`
  El paquete solo expone el entry raíz y `./themes.css`; no hay deep imports.
- `.storybook/main.ts` mantiene `@angular/core` en `optimizeDeps.include` y compila en
  `mode: 'development'`, y los targets de `angular.json` usan `enableProdMode: false`.
  Los tres ajustes son necesarios para que el renderer de Storybook pueda leer los metadatos
  (`@Component`) de la librería. Ver `AGENTS.md` para el detalle.
