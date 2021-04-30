import { DataTypes, ModelDefined, Sequelize } from 'sequelize';
import USG_Attributes from 'types/usg.attributes';
import USG_CreationAttributes from 'types/usgCreation.attributes';

export default function usgModelInit(sequelize: Sequelize): ModelDefined<USG_Attributes, USG_CreationAttributes> { 
  const model: ModelDefined<USG_Attributes, USG_CreationAttributes> =  sequelize.define('UserSignGroups', {
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
  }) 

  return model;
};