import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@/infrastructure/persistence/connection';

class ShiftModel extends Model<InferAttributes<ShiftModel>, InferCreationAttributes<ShiftModel>> {
  declare id?: string | undefined;
  declare startTime: string;
  declare endTime: string;
  declare nameTurno: string;
  declare description?: string | undefined;
  declare createdAt?: Date | undefined;
  declare updatedAt?: Date | undefined;
}

ShiftModel.init(
  {
    id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: true },
    nameTurno: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.STRING(255), allowNull: true },
    startTime: { type: DataTypes.STRING(36), allowNull: false },
    endTime: { type: DataTypes.STRING(36), allowNull: false }
  },
  {
    sequelize,
    modelName: 'Shift',
    tableName: 'TURNOS',
    timestamps: true
  }
);

export { ShiftModel };