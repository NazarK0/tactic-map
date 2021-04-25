import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import USG_Attributes from 'types/usg.attributes';
import USG_CreationAttributes from 'types/usgCreation.attributes';
import DsgSign from './dsgSign.model';

export default class UserSignGroup 
    extends Model<USG_Attributes, USG_CreationAttributes> 
    implements USG_Attributes {
        id: number;
        title: string;
        description: string;
        // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    };
    

export function usgModelInit(sequelize: Sequelize): void { 
  UserSignGroup.init({
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
      tableName: "UserSignGroups",
      sequelize, // passing the `sequelize` instance is required
  }) 

  UserSignGroup.hasMany(DsgSign, { onDelete: 'set null', foreignKey: 'usgFK' });
};