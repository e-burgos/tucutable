import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => ({
  root: import.meta.dirname,
  cacheDir: '../../node_modules/.vite/apps/demo',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4200,
    host: 'localhost',
  },
  plugins: [react(), nxCopyAssetsPlugin(['*.md']), tailwindcss()],
  resolve: {
    alias: {
      '@': import.meta.dirname + '/src',
    },
  },
  build: {
    outDir: '../../dist/apps/demo',
    emptyOutDir: true,
    reportCompressedSize: true,
    sourcemap: true,
    chunkSizeWarningLimit: 10000,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    minify: true,
  },
}));
