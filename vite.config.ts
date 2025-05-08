import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/FX/', // use o nome exato do seu repositório
  plugins: [react()],
})
