import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_PROXY } = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [react()],
    build: { outDir: '../static/dist' },
    base: '/static/dist/',
    server: {
      proxy: {
        '/api': {
          target: VITE_PROXY || 'http://127.0.0.1:8888',
          changeOrigin: true,
        },
      },
    },
  });
};
