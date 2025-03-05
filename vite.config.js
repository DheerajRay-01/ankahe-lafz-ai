import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: true,
    // hmr: false,
    strictPort: true,
    // port: 5173, // Ensure the correct port is set
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        // target: "https://ankahe-lafz-backend.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

