import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:8080',
        // target: 'https://acbe-39-63-245-45.ngrok-free.app/:8080',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
