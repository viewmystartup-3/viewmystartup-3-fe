import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'https://port-0-viewmystartup-3-m8ml2ohm3e1c28b1.sel4.cloudtype.app',
    },
  },
});
