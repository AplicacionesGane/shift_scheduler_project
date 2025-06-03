import { mysqlConfig } from '@infrastructure/configuration/mysqlSchemaEnviroments';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.user, mysqlConfig.password, {
  host: mysqlConfig.host,
  port: mysqlConfig.port,
  dialect: 'mysql'
});