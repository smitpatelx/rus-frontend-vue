import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const isP = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    {
      name: 'rus-dist-cleanup',
      closeBundle: isP
        ? async () => {
          // Remove hash from assets
          const fs = require('fs');
          const path = require('path');
          const dir = path.resolve(__dirname, 'dist/assets');
          if (!fs.existsSync(dir)) {
            return;
          }
          const files = fs.readdirSync(dir);
          files.forEach((file: string) => {
            // Remove hash from file name
            const newFile = file.replace(/-[a-z0-9]{8}\./, '.');
            fs.renameSync(path.resolve(dir, file), path.resolve(dir, newFile));
          });
        }
        : undefined,
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  ...(isP
    ? {}
    : {
      build: {
        outDir: 'dist',
        emptyOutDir: true,
        minify: true,
        watch: {
          include: 'src/**',
          exclude: 'node_modules/**, .git/**, dist/**, .vscode/**',
        },
        assetsDir: './assets',
        cssCodeSplit: false,
        sourcemap: false,
        ssr: false,
        rollupOptions: {
          treeshake: true,
          output: {
            entryFileNames: `assets/index.js`,
            chunkFileNames: `assets/index-chunk.js`,
            assetFileNames: `assets/[name].[ext]`,
          },
        },
        // lib: {
        //   entry: 'src/main.ts',
        //   name: 'vue3-vite-example',
        // }
      },
    }),
});
