import { Model, DataTypes, type InferAttributes, type InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '@/infrastructure/persistence/connection';

class CalendarModel extends Model<InferAttributes<CalendarModel>, InferCreationAttributes<CalendarModel>> {
    declare id: CreationOptional<string>;
    declare year: number;
    declare month: number;
    declare days: number;
    declare isHoliday: boolean;
    declare isWeekend: boolean;
    declare nameDay: string;
    declare nameMonth: string;
    declare holidayDescription?: string | null;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

CalendarModel.init({
    id: { type: DataTypes.STRING(36), primaryKey: true, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1900, max: 2100 } },
    month: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 12 } },
    days: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 31 } },
    isHoliday: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    isWeekend: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    nameDay: { type: DataTypes.STRING(20), allowNull: false },
    nameMonth: { type: DataTypes.STRING(20), allowNull: false },
    holidayDescription: { type: DataTypes.STRING(100), allowNull: true, defaultValue: null },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    modelName: 'Calendar',
    tableName: 'CALENDAR',
});

export { CalendarModel };
