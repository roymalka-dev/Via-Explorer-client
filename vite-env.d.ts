/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_API_BASE_URL: string;

  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
