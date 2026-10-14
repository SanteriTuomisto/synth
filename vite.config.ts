import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Served from GitHub Pages at santerituomisto.github.io/synth/
  base: '/synth/',
  plugins: [vue()],
})
