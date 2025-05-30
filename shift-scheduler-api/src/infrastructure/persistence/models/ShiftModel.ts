import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export class ShiftModel extends Model {
  public id!: number;
  public startTime!: Date;
  public endTime!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShiftModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'shifts',
  }
);