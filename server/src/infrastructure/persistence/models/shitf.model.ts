import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@infrastructure/persistence/database';
import { Shift } from '@/domain/entities/shift.entity';

class ShiftModel extends Model<InferAttributes<ShiftModel>, InferCreationAttributes<ShiftModel>> implements Shift {
    declare id?: string | undefined;
    declare startTime: string;
    declare idStore: string;
    declare endTime: string;
    declare date: string;
    declare createdAt?: Date | undefined;
    declare updatedAt?: Date | undefined;
}

ShiftModel.init(
    {
        id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: true },
        startTime: { type: DataTypes.STRING(36), allowNull: false },
        endTime: { type: DataTypes.STRING(36), allowNull: false },
        idStore: { type: DataTypes.STRING(36), allowNull: true },
        date: { type: DataTypes.STRING(10), allowNull: false }
    },
    {
        sequelize,
        modelName: 'Shift',
        tableName: 'TURNOS',
        timestamps: true
    }
);

export { ShiftModel };