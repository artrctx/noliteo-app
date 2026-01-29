declare namespace NodeJS {
  export interface ProcessEnv {
    EXPO_API_URL: string;
    DATABASE_CONN_STR: string;
    EXPO_PUBLIC_API_URL: string;
    EXPO_PUBLIC_APP_ENV: string;
    SERVER_API_URL: string;
  }
}
