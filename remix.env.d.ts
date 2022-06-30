/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APPWRITE_API: string;
      APPWRITE_DOMAIN: string;
      APPWRITE_ID: string;
      SENDGRID_KEY: string;
      COOKIE_SECRET: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {}