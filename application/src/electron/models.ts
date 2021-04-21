import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';
import DSG_Attributes from 'types/dsg.attributes';
import DSG_CreationAttributes from 'types/dsgCreation.attributes';
import DSG_SignAttributes from 'types/dsgSign.attributes';
import DSG_SignCreationAttributes from 'types/dsgSignCreation.attributes';
import USG_Attributes from 'types/usg.attributes';
import USG_CreationAttributes from 'types/usgCreation.attributes';
import UserInterface from './entities/user/user.interface';
import UserInputInterface from './entities/user/userInput.interface';

export default function modelsInit(sequelize: Sequelize) {
  class User 
    extends Model<UserInterface, UserInputInterface> 
    implements UserInterface {
      id: number;
      login: string;
      password: string;

      // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    login: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
      tableName: "users",
      sequelize, // passing the `sequelize` instance is required
  })

  class DsgSign 
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

  DsgSign.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sign: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
  }, {
      tableName: "dsgSigns",
      sequelize, // passing the `sequelize` instance is required
  })
  

  class DefaultSignGroup 
    extends Model<DSG_Attributes, DSG_CreationAttributes> 
    implements DSG_Attributes {
      id: number;
      title: string;
      description: string;

      // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

  DefaultSignGroup.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
      tableName: "defaultSignGroups",
      sequelize, // passing the `sequelize` instance is required
  })

  DefaultSignGroup.hasMany(DsgSign, { onDelete: 'cascade', foreignKey: {name: 'dsgFK', allowNull: false } });
  DsgSign.belongsTo(DefaultSignGroup);
  
  class UserSignGroup 
    extends Model<USG_Attributes, USG_CreationAttributes> 
    implements USG_Attributes {
      id: number;
      title: string;
      description: string;

      // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  };

  UserSignGroup.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(30),
      allowNull: false,
    },
    description: {
      type: new DataTypes.STRING(200),
      allowNull: true,
    },
  }, {
      tableName: "userSignGroups",
      sequelize, // passing the `sequelize` instance is required
  })

  UserSignGroup.hasMany(DsgSign, { onDelete: 'setnull', foreignKey: 'usgFK' })


};