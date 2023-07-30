import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { builtinModules } from 'module'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    rollupOptions: {
      plugins: {
        name: 'print-env',
        generateBundle() {
          if (process.env.DEBUG) {
            console.log('REACT_APP_BACKEND_URL is', process.env.REACT_APP_BACKEND_URL);
            console.log('VITE_APP_BACKEND_URL is', process.env.VITE_APP_BACKEND_URL);
          }
        },
      },
      external: ['fs', 'path', 'os', ...builtinModules],
    },
  },
  server: {
    fs: {
      strict: true,
    },
  },
  mode: mode
}));
