import { DataTypes, Model, Sequelize } from "sequelize";

export class Subscription extends Model {
    public id!: number;
    public user_id!: number;
    public member_id!:number; 
    public membership_plan_id!:number;   
    public startDate!: Date;   
    public endDate!: Date;
    public status!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    Subscription.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        member_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        membership_plan_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "subscription",
        tableName: "subscriptions",
      }
    );
  };