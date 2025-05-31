import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@infrastructure/persistence/database';
import { WorkSchedule } from '@domain/entities/workschedule.entity';

export class WorkScheduleModel extends Model<InferAttributes<WorkScheduleModel>, InferCreationAttributes<WorkScheduleModel>> implements WorkSchedule {
    declare id?: string;
    declare employeeDocument: string;
    declare shiftId: string;
    declare storeId: string;
    declare assignedDate: string;
    declare status: 'assigned' | 'completed' | 'absent';
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

WorkScheduleModel.init(
    {
        id: { 
            type: DataTypes.STRING(36), 
            primaryKey: true, 
            allowNull: false 
        },
        employeeDocument: { 
            type: DataTypes.STRING(20), 
            allowNull: false,
            references: {
                model: 'VENDEDORES',
                key: 'DOCUMENTO'
            }
        },
        shiftId: { 
            type: DataTypes.STRING(36), 
            allowNull: false,
            references: {
                model: 'TURNOS',
                key: 'id'
            }
        },
        storeId: { 
            type: DataTypes.STRING(10), 
            allowNull: false,
            references: {
                model: 'SUCURSALES',
                key: 'CODIGO'
            }
        },
        assignedDate: { 
            type: DataTypes.DATEONLY, // Solo fecha, sin hora
            allowNull: false 
        },
        status: { 
            type: DataTypes.ENUM('assigned', 'completed', 'absent'), 
            allowNull: false, 
            defaultValue: 'assigned' 
        }
    },
    {
        sequelize,
        modelName: 'WorkSchedule',
        tableName: 'HORARIOS_TRABAJO',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['employeeDocument', 'assignedDate']
            },
            {
                fields: ['storeId', 'assignedDate']
            },
            {
                fields: ['assignedDate']
            }
        ]
    }
);
