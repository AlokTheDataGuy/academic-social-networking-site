import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Explicitly set PostCSS config path
  css: {
    postcss: true, // Use the postcss.config.js in the project root
  },
})