import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { nitro } from 'nitro/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
  envDir: '../../',
  resolve: { tsconfigPaths: true },
  plugins: [
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
    devtools(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
      },
    }),
    nitro({ traceDeps: ['react', 'react-dom'] }),
    viteReact(),
    sentryTanstackStart({
      org: 'devlabs-lu',
      project: 'feedback-saas-admin-web',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});

export default config;
