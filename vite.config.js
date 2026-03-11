import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-icons/fa',
      'react-icons/md',
      'react-icons/tb',
      'react-icons/bs',
      'react-icons/fa6',
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pdf: ['@react-pdf/renderer'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: [
            'react-icons/fa',
            'react-icons/md',
            'react-icons/tb',
            'react-icons/bs',
            'react-icons/fa6',
          ],
        },
      },
    },
  },
});
