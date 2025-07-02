import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    // Add these global definitions
    'process.env': {},
    global: {},
  },
  optimizeDeps: {
    // Add these if you're using @stomp/stompjs
    include: ['@stomp/stompjs'],
  },
});