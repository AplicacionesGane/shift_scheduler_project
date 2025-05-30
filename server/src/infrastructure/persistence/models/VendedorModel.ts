import { Model, DataTypes, type InferAttributes, type InferCreationAttributes } from 'sequelize';
import { sequelize } from '../database';

// DOCUMENTO	varchar(20)	NO	PRI	(null)	
// NOMBRES	varchar(60)	YES		(null)	
// GRPVTAS_CODIGO	varchar(30)	YES		(null)	
// CARGO	varchar(30)	YES		(null)	
// VERSION	varchar(20)	YES		(null)	
// NOMBRECARGO	varchar(30)	YES		(null)	
// CCOSTO	varchar(10)	YES		(null)	

export class VendedorModel extends Model<InferAttributes<VendedorModel>, InferCreationAttributes<VendedorModel>> {
  declare DOCUMENTO: string;
  declare NOMBRES: string;
  declare GRPVTAS_CODIGO: string;
  declare CARGO: string;
  declare VERSION: string;
  declare NOMBRECARGO: string;
  declare CCOSTO: string;
}

VendedorModel.init(
  {
    DOCUMENTO: { type: DataTypes.STRING(20), allowNull: false, primaryKey: true, },
    NOMBRES: { type: DataTypes.STRING(60), allowNull: true, },
    GRPVTAS_CODIGO: { type: DataTypes.STRING(30), allowNull: true, },
    CARGO: { type: DataTypes.STRING(30), allowNull: true, },
    VERSION: { type: DataTypes.STRING(20), allowNull: true, },
    NOMBRECARGO: { type: DataTypes.STRING(30), allowNull: true, },
    CCOSTO: { type: DataTypes.STRING(10), allowNull: true, },
  },
  {
    sequelize,
    modelName: 'Vendedor',
    tableName: 'VENDEDORES',
    timestamps: false,
  }
);