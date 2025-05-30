import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { Employee } from '../../domain/entities/Employee';
import { Shift } from '../../domain/entities/Shift';

export class WorkScheduleModel extends Model {
  public id!: number;
  public employeeId!: number;
  public shiftId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkScheduleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    shiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Shift,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'work_schedules',
  }
);