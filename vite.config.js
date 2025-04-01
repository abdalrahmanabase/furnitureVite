import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: process.env.NODE_ENV === 'development' ? {
    proxy: {
      '/api': {
        target: 'https://furniture-haven.rkmait.com',
        changeOrigin: true,
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json',
        }
      }
    }
  } : {}
});
