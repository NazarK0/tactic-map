import UserInterface from '../entities/user/user.interface';
import UserInputInterface from '../entities/user/userInput.interface';
import { DataTypes, Model, ModelDefined, Sequelize } from 'sequelize';


export default class User 
    extends Model<UserInterface, UserInputInterface> 
    implements UserInterface {
      id: number;
      login: string;
      password: string;

      // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
};

export function userModelsInit(sequelize: Sequelize): void{

 User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
      tableName: "Users",
      sequelize, // passing the `sequelize` instance is required
  })
};