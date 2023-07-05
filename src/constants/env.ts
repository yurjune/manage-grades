interface Env {
  API_KEY: string;
  AUTH_DOMAIN: string;
  PROJECT_ID: string;
  STORAGE_BUCKET: string;
  MESSAGING_SENDER_ID: string;
  APP_ID: string;
  TEST_EMAIL: string;
  TEST_PW: string;
}

export const env: Env = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY ?? '',
  AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN ?? '',
  PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET ?? '',
  MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ?? '',
  APP_ID: process.env.NEXT_PUBLIC_APP_ID ?? '',
  TEST_EMAIL: process.env.NEXT_PUBLIC_TEST_EMAIL ?? '',
  TEST_PW: process.env.NEXT_PUBLIC_TEST_PW ?? '',
};
