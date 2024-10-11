declare global {
    namespace NodeJs {
        interface ProcessEnv {
            NODE_ENV: 'developtment' | 'production' | 'test';
            DB_PASSWORD: string;
            DB_DEV_NAME: string
            DB_TEST_NAME: string
            DB_USER: string
            DB_HOST: string
            DB_PORT: string
        }
    }
}