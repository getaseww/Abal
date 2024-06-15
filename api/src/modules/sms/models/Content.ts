import { DataTypes, Model, Sequelize } from "sequelize";

export class Content extends Model {
  public id!: number;
  public title!: string;
  public body!: string;
  public phone_numbers!: string;
  public status!: string;
  public message_status!: string;
  public reference_txt!: string;
  public sent_date!: Date;
  public user_id!: number;
  public modified_by!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Content.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_sent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sent_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      phone_numbers: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Waiting for approval",
      },
      reference_txt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      message_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Created"
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
      modelName: "content",
      tableName: "contents",
    }
  );
};