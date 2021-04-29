import { DataTypes, ModelDefined, Sequelize } from 'sequelize';
import DSG_Attributes from 'types/dsg.attributes';
import DSG_CreationAttributes from 'types/dsgCreation.attributes';

export default function dsgModelInit(sequelize: Sequelize): ModelDefined<DSG_Attributes, DSG_CreationAttributes> {
  const model: ModelDefined<DSG_Attributes, DSG_CreationAttributes> = sequelize.define('DefaultSignGroups', {
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
  model.hasMany(sequelize.models.DsgSigns, { onDelete: 'cascade', foreignKey: 'dsgFK' });

  return model;
};