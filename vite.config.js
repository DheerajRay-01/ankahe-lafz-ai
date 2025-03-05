import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL ,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
