import { DataTypes, Model, Sequelize } from "sequelize";

export class Subscription extends Model {
  public id!: number;
  public package_id!: number;
  public amount!: number;
  public quantity!: number;
  public used!: number;
  public is_active!: boolean;
  public user_id!: number;
  public modified_by!: number;
  public is_approved!: boolean;
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
      package_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      is_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      modelName: "sms_subscription",
      tableName: "sms_subscriptions",
    }
  );
};