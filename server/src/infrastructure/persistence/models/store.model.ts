import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '@infrastructure/persistence/database';

class StoreModel extends Model<InferAttributes<StoreModel>, InferCreationAttributes<StoreModel>> {
  declare ZONA: string;
  declare CCOSTO: string;
  declare CODIGO: string;
  declare NOMBRE: string;
  declare DIRECCION: string;
  declare TIPO: string;
  declare DISPOSITIVO: string;
  declare SUPERVISOR: string;
  declare CANAL: string;
  declare CATEGORIA: string;
  declare HORA_ENTRADA: string;
  declare HORA_SALIDA: string;
  declare HORA_ENTRADA_FES: string;
  declare HORA_SALIDA_FES: string;
  declare SUBZONA: string;
  declare CELULA: string;
  declare HORAS_ORDINARIAS: number;
  declare HORAS_FESTIVAS: number;
  declare ESTADO: string;
}

StoreModel.init(
  {
    ZONA: { type: DataTypes.STRING(10), allowNull: false },
    CCOSTO: { type: DataTypes.STRING(10), allowNull: false },
    CODIGO: { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
    NOMBRE: { type: DataTypes.STRING(40), allowNull: true },
    DIRECCION: { type: DataTypes.STRING(40), allowNull: true },
    TIPO: { type: DataTypes.STRING(20), allowNull: true },
    DISPOSITIVO: { type: DataTypes.STRING(20), allowNull: true },
    SUPERVISOR: { type: DataTypes.STRING(20), allowNull: true },
    CANAL: { type: DataTypes.STRING(30), allowNull: true },
    CATEGORIA: { type: DataTypes.STRING(30), allowNull: true },
    HORA_ENTRADA: { type: DataTypes.TIME, allowNull: true },
    HORA_SALIDA: { type: DataTypes.TIME, allowNull: true },
    HORA_ENTRADA_FES: { type: DataTypes.TIME, allowNull: true },
    HORA_SALIDA_FES: { type: DataTypes.TIME, allowNull: true },
    SUBZONA: { type: DataTypes.STRING(30), allowNull: true },
    CELULA: { type: DataTypes.STRING(30), allowNull: true },
    HORAS_ORDINARIAS: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 8 },
    HORAS_FESTIVAS: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 6 },
    ESTADO: { type: DataTypes.STRING(5), allowNull: true, defaultValue: 'A' }
  },
  {
    sequelize,
    modelName: 'Store',
    tableName: 'SUCURSALES',
    timestamps: false
  }
);

export { StoreModel };