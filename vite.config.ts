import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      viteCompression({ algorithm: 'gzip' }),
    ],
    resolve: {
      tsconfigPaths: true,
    },
    define: {
      'process.env.API_HOST': JSON.stringify(env.API_HOST),
      'process.env.HOST': JSON.stringify(env.HOST),
      'process.env.YA_ENDPOINT': JSON.stringify(env.YA_ENDPOINT),
    },
    server: {
      port: 3005,
      open: true,
    },
    css: {
      lightningcss: {
        errorRecovery: true,
      },
    },
    build: {
      outDir: 'build',
    },
  };
});
