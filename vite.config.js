import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically open the app in the browser
  },
  build: {
    target: 'esnext', // Specify ECMAScript target for modern JS
    outDir: 'dist', // Where to output the production build
  },
});