/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), // Add Tailwind
    autoprefixer(), // Add Autoprefixer
  ],
  resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    server: {
      proxy: {
        '/back': {
          target: 'https://hidden-x-backend.onrender.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/back/, ''),
        },
      },
    },
})
