import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nabi-trip/',
  build: {
    outDir: 'dist',
  },
  publicDir: 'public',
})

