import type { StorybookConfig } from '@storybook/angular-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [],
  "framework": "@storybook/angular-vite",
  viteFinal: (viteConfig) => ({
    ...viteConfig,
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
