import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import ToolAttributes from 'types/tool.attributes';
import ToolCreationAttributes from 'types/toolCreation.attributes';

export default function toolModelInit(sequelize: Sequelize): ModelDefined<ToolAttributes, ToolCreationAttributes> {
  const model: ModelDefined<ToolAttributes, ToolCreationAttributes> = sequelize.define("tools", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    signUrl: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    signWidth: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    signHeight: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    title: {
      type: new DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Неназваний інструмент'
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '',
    },
    type: {
      type: new DataTypes.STRING(70),
      allowNull: false,
      defaultValue: 'mil-sign',
    },
  })

  return model;
};