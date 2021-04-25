import { DataTypes, Model, Sequelize } from 'sequelize';
import DSG_Attributes from 'types/dsg.attributes';
import DSG_CreationAttributes from 'types/dsgCreation.attributes';
import DsgSign from './dsgSign.model';

export default class DefaultSignGroup 
extends Model<DSG_Attributes, DSG_CreationAttributes> 
implements DSG_Attributes {
  id: number;
  title: string;
  description: string;

  // timestamps!
public readonly createdAt!: Date;
public readonly updatedAt!: Date;
};

export function dsgModelInit(sequelize: Sequelize): void {
  DefaultSignGroup.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: new DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Неназвана група'
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ''
    },
  }, {
      tableName: "DefaultSignGroups",
      sequelize, // passing the `sequelize` instance is required
  })
  DefaultSignGroup.hasMany(DsgSign, { onDelete: 'cascade', foreignKey: {name: 'dsgFK' } });
};