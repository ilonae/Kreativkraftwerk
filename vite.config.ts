import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        // Public landing page — served at `/`
        main: 'index.html',
        // The full React app — reachable at `/app.html` while the site is
        // in coming-soon mode. Swap these two filenames back at launch time.
        app: 'app.html',
      },
    },
  },
});
