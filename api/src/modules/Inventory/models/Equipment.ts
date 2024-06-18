import { DataTypes, Model, Sequelize } from "sequelize";

export class Equipment extends Model {
  public id!: number;
  public equipment_category_id!: number;
  public name: string;
  public brand!: string;
  public model!: string;
  public serial_number!: string;
  public purchase_date!: Date;
  public price!: number;
  public location!: string;
  public status!: string;
  public condition!: string;

  public user_id!: number;
  public modified_by!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Equipment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      equipment_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      serial_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      purchase_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: "equipment",
      tableName: "equipments",
    }
  );
};