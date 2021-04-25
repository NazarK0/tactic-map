import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import DSG_SignAttributes from 'types/dsgSign.attributes';
import DSG_SignCreationAttributes from 'types/dsgSignCreation.attributes';

export default class DsgSign 
    extends Model<DSG_SignAttributes, DSG_SignCreationAttributes> 
    implements DSG_SignAttributes {
      id: number;
      sign: string;
      title: string;
      description: string;

      // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

export function dsgSignModelsInit(sequelize: Sequelize): void {
  DsgSign.init({
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
  }, {
      tableName: "dsgSigns",
      sequelize, // passing the `sequelize` instance is required
  })
};