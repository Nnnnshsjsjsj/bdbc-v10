import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_PREVIEW=1 builds the sandboxed preview: relative paths, hash routing, forms off.
export default defineConfig(() => ({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_PREVIEW === '1' ? './' : '/',
}))
