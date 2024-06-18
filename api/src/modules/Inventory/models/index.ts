import { Sequelize } from "sequelize";
import EquipmentCategoryFactory, { EquipmentCategory } from "./EquipmentCategory";
import EquipmentFactory, { Equipment } from "./Equipment";
import LocationFactory, { Location } from "./Location";
import { User } from "../../../models/User";




export const InventoryTables = (sequelize: Sequelize) => {
    EquipmentCategoryFactory(sequelize);
    EquipmentFactory(sequelize);
    LocationFactory(sequelize);

    User.hasMany(EquipmentCategory, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    EquipmentCategory.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(EquipmentCategory, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    EquipmentCategory.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Equipment, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Equipment.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Equipment, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Equipment.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Location, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Location.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Location, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Location.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    EquipmentCategory.hasMany(Equipment, { foreignKey: "equipment_category_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Equipment.belongsTo(EquipmentCategory, { foreignKey: "equipment_category_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
   
}


export {
    Equipment,
    EquipmentCategory,
    Location,
}

