import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend API
        changeOrigin: true,
        secure: false,
        // If your backend doesn't expect /api prefix, you can rewrite:
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
