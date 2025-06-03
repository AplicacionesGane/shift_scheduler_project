import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@/infrastructure/persistence/connection';

class WorkScheduleModel extends Model<InferAttributes<WorkScheduleModel>, InferCreationAttributes<WorkScheduleModel>> {
    declare id?: string;
    declare employee: string;
    declare shiftId: string;
    declare storeId: string;
    declare year: number;
    declare month: number;
    declare day: number;
    declare status: 'assigned' | 'completed' | 'absent';
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

WorkScheduleModel.init({
    id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false },
    employee: { type: DataTypes.STRING(20), allowNull: false },
    shiftId: { type: DataTypes.STRING(36), allowNull: false },
    storeId: { type: DataTypes.STRING(10), allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    month: { type: DataTypes.INTEGER, allowNull: false },
    day: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('assigned', 'completed', 'absent'), allowNull: false, defaultValue: 'assigned' }
},
    {
        sequelize,
        modelName: 'WorkSchedule',
        tableName: 'HORARIOS_TRABAJO',
        timestamps: true,
    }
);

export { WorkScheduleModel };