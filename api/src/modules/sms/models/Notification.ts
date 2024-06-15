import { DataTypes, Model, Sequelize } from "sequelize";

export class Notification extends Model {
    public id!: number;
    public content_id!: number;
    public resident_id!: number;
    public mobile_number!: string;
    public is_sent!: boolean;
    public sent_date!: Date;
    public reference_number!: string;
    public user_id!:number;
    public modified_by!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }
  
  export default (sequelize: Sequelize) => {
    Notification.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        resident_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        mobile_number: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        is_sent: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        sent_date: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        reference_number: {
            type: DataTypes.STRING,
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
        modelName: "notification",
        tableName: "notifications",
      }
    );
  };