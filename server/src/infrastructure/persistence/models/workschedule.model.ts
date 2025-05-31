import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { EmployeeModel } from '@infrastructure/persistence/models/employee.model';
import { ShiftModel } from '@infrastructure/persistence/models/shitf.model';
import { StoreModel } from '@infrastructure/persistence/models/store.model';
import { WorkSchedule } from '@domain/entities/workschedule.entity';
import { sequelize } from '@infrastructure/persistence/database';

class WorkScheduleModel extends Model<InferAttributes<WorkScheduleModel>, InferCreationAttributes<WorkScheduleModel>> implements WorkSchedule {
    declare id?: string;
    declare employeeDocument: string;
    declare shiftId: string;
    declare storeId: string;
    declare assignedDate: string;
    declare status: 'assigned' | 'completed' | 'absent';
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

WorkScheduleModel.init({
    id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false },
    employeeDocument: { type: DataTypes.STRING(20), allowNull: false },
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

WorkScheduleModel.belongsTo(EmployeeModel, { foreignKey: 'employeeDocument', targetKey: 'DOCUMENTO' });
WorkScheduleModel.belongsTo(ShiftModel, { foreignKey: 'shiftId', targetKey: 'id' });
WorkScheduleModel.belongsTo(StoreModel, { foreignKey: 'storeId', targetKey: 'CODIGO' });

export { WorkScheduleModel };