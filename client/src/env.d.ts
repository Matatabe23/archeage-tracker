/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_API_URL: string
    readonly VITE_APP_FRONTEND_API_URL: string
    // добавь сюда и другие переменные, если используешь
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  