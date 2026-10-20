import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": "@storybook/angular-vite",
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    // Build with Angular's development compilation.
    //
    // Storybook's Angular renderer derives each story's template from the
    // component's @Component metadata (selector, inputs) through Angular's
    // reflection API. In a production compilation that metadata is stripped -
    // @analogjs/vite-plugin-angular defines `ngDevMode` as `false` and enables
    // the advanced optimizations, which drop the library's
    // `ɵɵngDeclareClassMetadata(...)` call - and every story then fails with
    // "Cannot read properties of undefined (reading 'selector')".
    // `mode: 'development'` keeps that metadata in the bundle.
    mode: 'development',
    optimizeDeps: {
      ...viteConfig.optimizeDeps,
      // Keep @angular/core as its own pre-bundled dep. Without it Vite inlines
      // @angular/core into a shared chunk, so Storybook's renderer chunk and the
      // component library end up with two different copies of @angular/core.
      // `component instanceof Component` then fails and Storybook cannot derive
      // the story template from the component metadata.
      include: [...(viteConfig.optimizeDeps?.include ?? []), '@angular/core'],
    },
  }),
};
export default config;
