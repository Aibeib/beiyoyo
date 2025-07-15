import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path, {dirname} from 'path';

import os from 'os';
// Node.js ESM 中替代 __dirname 的方法：
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({mode})=>{

  const env = loadEnv(mode, process.cwd());
  function getLocalIP() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const interfaces: any = os.networkInterfaces() ;
  for (const name in interfaces) {
    for (const iface of interfaces[name]) {
      // 只考虑 IPv4 且非 127.0.0.1 地址
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // fallback
}

  console.log(env,'env')
  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      host: '0.0.0.0', // 开发环境绑定域名，生产环境不限制
      port: 5173,
      strictPort: true,
    },
     proxy: {
      '/proxy-api': {
        target: `http://${getLocalIP()}:8181`, // 你本地的后端服务地址
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/proxy-api/, ''),
        secure: false,
        // 强制覆盖某些头部
        headers: {
          "Accept-Encoding": "gzip", // 避免 chunked 编码
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      },
    },
  } 
})
