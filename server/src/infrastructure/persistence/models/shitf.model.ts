import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@infrastructure/persistence/database';
import { Shift } from '@/domain/entities/shift.entity';

class ShiftModel extends Model<InferAttributes<ShiftModel>, InferCreationAttributes<ShiftModel>> implements Shift {
    declare id?: string | undefined;
    declare startTime: Date;
    declare idStore: string | null;
    declare endTime: Date;
    declare date: Date;
    declare createdAt?: Date | undefined;
    declare updatedAt?: Date | undefined;
}

ShiftModel.init(
    {
        id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: true },
        startTime: { type: DataTypes.DATE, allowNull: false },
        idStore: { type: DataTypes.STRING(36), allowNull: true },
        endTime: { type: DataTypes.DATE, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false }
    },
    {
        sequelize,
        modelName: 'Shift',
        tableName: 'TURNOS',
        timestamps: true
    }
);