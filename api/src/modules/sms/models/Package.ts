import { DataTypes, Model, Sequelize } from "sequelize";

export class Package extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public quantity!: number;
    public user_id!:number;
    public modified_by!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    Package.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        price: {
          type: DataTypes.DOUBLE,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        modified_by: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "package",
        tableName: "packages",
      }
    );
  };