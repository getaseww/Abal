import { DataTypes, Model, Sequelize } from "sequelize";

export class EquipmentCategory extends Model {
  public id!: number;
  public name!: number;
  public user_id!: number;
  public modified_by!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  EquipmentCategory.init(
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
      modelName: "equipment_category",
      tableName: "equipment_categories",
    }
  );
};