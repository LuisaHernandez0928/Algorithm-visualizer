import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/ui/components',
      '@sections': '/src/ui/section',
      '@data': '/src/data',
      '@globalTypes': '/src/ui/types',
      '@src': '/src/',
    },
  },
});
