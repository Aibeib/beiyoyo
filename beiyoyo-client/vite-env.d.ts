/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly API_BASE_URL?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  // 其他自定义环境变量...
}