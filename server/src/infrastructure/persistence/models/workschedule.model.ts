import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { sequelize } from '@infrastructure/persistence/database';

class WorkScheduleModel extends Model<InferAttributes<WorkScheduleModel>, InferCreationAttributes<WorkScheduleModel>>  {
    declare id?: string;
    declare employee: string;
    declare shiftId: string;
    declare storeId: string;
    declare assignedDate: string;
    declare status: 'assigned' | 'completed' | 'absent';
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

WorkScheduleModel.init({
    id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false },
    employee: { type: DataTypes.STRING(20), allowNull: false },
    shiftId: { type: DataTypes.STRING(36), allowNull: false },
    storeId: { type: DataTypes.STRING(10), allowNull: false },
    assignedDate: { type: DataTypes.DATEONLY, allowNull: false },
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