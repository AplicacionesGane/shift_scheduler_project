import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config = {
  app: {
    port: process.env.APP_PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shift_scheduler',
  },
};

export default config;