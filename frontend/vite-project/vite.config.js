import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/Admin': {
        target: 'http://localhost:3000', // Make sure this matches your backend server
        changeOrigin: true,
      },
      '/questions': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
