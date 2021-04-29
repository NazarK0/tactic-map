import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import DSG_SignAttributes from 'types/dsgSign.attributes';
import DSG_SignCreationAttributes from 'types/dsgSignCreation.attributes';

export default function dsgSignModelsInit(sequelize: Sequelize): ModelDefined<DSG_SignAttributes, DSG_SignCreationAttributes> {
  const model: ModelDefined<DSG_SignAttributes, DSG_SignCreationAttributes> = sequelize.define("DsgSigns", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    sign: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Неназваний знак'
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
    },
  })

  return model;
};