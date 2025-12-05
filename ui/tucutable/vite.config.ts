/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { copyFileSync } from 'fs';
import tailwindcssPostcss from '@tailwindcss/postcss';

const copyReadmePlugin = () => {
  return {
    name: 'copy-readme',
    closeBundle: () => {
      const readmePath = path.join(__dirname, '../../README.md');
      const destPath = path.join(__dirname, '../../dist/ui/tucutable/README.md');
      copyFileSync(readmePath, destPath);
      console.log('README.md copied to distribution directory');
    },
  };
};

const copyChangelogPlugin = () => {
  return {
    name: 'copy-changelog',
    closeBundle: () => {
      const changelogPath = path.join(__dirname, 'CHANGELOG.md');
      const destPath = path.join(
        __dirname,
        '../../dist/ui/tucutable/CHANGELOG.md'
      );
      copyFileSync(changelogPath, destPath);
      console.log('CHANGELOG.md copied to distribution directory');
    },
  };
};

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/ui/tucutable',
  plugins: [
    react(),
    nxViteTsPaths(),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
    copyReadmePlugin(),
    copyChangelogPlugin(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcssPostcss({})],
    },
  },
  resolve: {
    alias: {
      '@/lucide-react': path.resolve(__dirname, 'src/lucide-react'),
      '@/react-router-dom': path.resolve(__dirname, 'src/react-router-dom'),
    },
  },
  build: {
    outDir: '../../dist/ui/tucutable',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    lib: {
      entry: 'src/index.ts',
      name: 'tucutable',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'lucide-react',
        'react-router-dom',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'lucide-react': 'LucideReact',
          'react-router-dom': 'ReactRouter',
        },
      },
    },
  },
});
