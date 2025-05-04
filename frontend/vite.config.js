import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/ecommerce/",
  plugins: [react()],
  build: {
    outDir: '../docs',           // <-- output directly into the docs/ folder
    emptyOutDir: true,           // <-- clear docs/ before each build
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
