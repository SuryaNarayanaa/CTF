/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: '/ctf/',  // ✅ This makes all assets load with /ctf/ prefix
  plugins: [react(), tailwindcss(), autoprefixer()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  server: {
    allowedHosts: ['ctf-frontend-latest.onrender.com'],
    proxy: {
      '/back': {
        target: 'https://hidden-x-backend.onrender.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/back/, ''),
      },
    },
  },
})
