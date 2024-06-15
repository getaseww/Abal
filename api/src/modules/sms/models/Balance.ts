import { DataTypes, Model, Sequelize } from "sequelize";

export class Balance extends Model {
    public id!: number;
    public balance!: number;
    public used!: number;
    public user_id!:number;
    public modified_by!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    Balance.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        balance: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue:0,
        },
        used: {
          type: DataTypes.BIGINT,
          allowNull: false,
          defaultValue:0,
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
        modelName: "sms_balance",
        tableName: "sms_balances",
      }
    );
  };