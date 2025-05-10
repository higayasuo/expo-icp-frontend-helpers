import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ExpoIcpFrontendHelpers',
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['canister-manager', '@dfinity/identity', 'expo-web-browser'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});