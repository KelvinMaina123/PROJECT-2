/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  // Add any other VITE_ environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
