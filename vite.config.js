import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true, 
    allowedHosts: [
      'bfb4-2401-4900-900a-e96a-6887-b002-a60c-6507.ngrok-free.app'
    ],
    base:"/GTA-VI"
  }
})
