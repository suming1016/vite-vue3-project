/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_APP_TITLE: string
  VITE_DEVTOOLS: 'true' | 'false'
  VITE_APP_NAMESPACE: string
  VITE_PORT: string
  VITE_BASE_URL: string
  VITE_GLOB_API_URL: string
  // 添加其他自定义环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
