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
      host: '0.0.0.0',  // Ensure it binds to all interfaces
      port: process.env.PORT || 5173,  // Use Render’s PORT variable

      allowedHosts: ['ctf-frontend-latest.onrender.com', 'https://hidden-x.vercel.app/'],
    },
})
