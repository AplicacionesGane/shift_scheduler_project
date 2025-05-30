import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Employee } from '../../domain/entities/Employee';

export class EmployeeModel extends Model<Employee> implements Employee {
  public id!: number;
  public name!: string;
  public role!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EmployeeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',
  }
);