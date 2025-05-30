import { z } from 'zod'

export const mysqlSchemaEnvironments = z.object({
  MYSQL_HOST: z.string().min(1, 'MYSQL_HOST is required'),
  MYSQL_PORT: z.string().min(1, 'MYSQL_PORT is required').transform((val: string) => parseInt(val, 10)),
  MYSQL_USER: z.string().min(1, 'MYSQL_USER is required'),
  MYSQL_PASSWORD: z.string().min(1, 'MYSQL_PASSWORD is required'),
  MYSQL_DATABASE: z.string().min(1, 'MYSQL_DATABASE is required'),
});

const { success, data, error } = mysqlSchemaEnvironments.safeParse(process.env);

if (!success) {
  console.error('Invalid MySQL environment variables:', error.errors);
  process.exit(1);
}

export const mysqlConfig = {
  host: data.MYSQL_HOST,
  port: data.MYSQL_PORT,
  user: data.MYSQL_USER,
  password: data.MYSQL_PASSWORD,
  database: data.MYSQL_DATABASE,
};