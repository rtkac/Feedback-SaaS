import { paraglideVitePlugin } from '@inlang/paraglide-js';
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
    tanstackStart(),
    nitro({ traceDeps: ['react', 'react-dom'] }),
    viteReact(),
  ],
  environments: {
    ssr: { build: { rollupOptions: { input: './server.ts' } } },
  },
});

export default config;
