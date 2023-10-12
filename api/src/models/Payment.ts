import { DataTypes, Model, Sequelize } from "sequelize";

export class Payment extends Model {
  public id!: string;
  public amount!: number;
  public trx_ref!: string;
  public status!: string;
  public subscriptionId!: number;
  public memberId!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Payment.init(
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      trx_ref: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
      subscriptionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "payment",
      tableName: "payments",
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  // Define associations
  
};
