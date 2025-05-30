import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../infrastructure/persistence/database';

export class Store extends Model {
    public id!: number;
    public name!: string;
    public location!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Store.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'stores',
});