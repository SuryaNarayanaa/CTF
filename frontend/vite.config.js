/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
  ],
  resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    server: {
      host: true, // Allow external access
      allowedHosts: ['ctf-frontend-latest.onrender.com', 'https://hidden-x.vercel.app/'], 
      proxy: {
        '/back': {
          target: 'https://hidden-x-backend.onrender.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/back/, ''),
        },
      },
    },
})
