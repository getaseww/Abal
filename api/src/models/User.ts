import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    public id!: number;
    public firstName!: string;    
    public lastName!: string;   
    public business_name!: string;
    public email!: string;
    public password!: string;
    public isAdmin!: string|null;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        business_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue:false,
        },
      },
      {
        sequelize,
        modelName: "user",
        tableName: "users",
      }
    );


  };