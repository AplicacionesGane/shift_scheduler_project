import { Dialect } from 'sequelize';

const databaseConfig = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shift_scheduler',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shift_scheduler_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql' as Dialect,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql' as Dialect,
  },
};

export default databaseConfig;