import { Sequelize } from "sequelize";
import BalanceFactory, { Balance } from "./Balance";
import ContentFactory, { Content } from "./Content";
import PackageFactory, { Package } from "./Package";
import SubscriptionFactory, { Subscription } from "./Subscription";
import NotificationFactory, { Notification } from "./Notification";
import { User } from "../../../models/User";




export const SMSTables = (sequelize: Sequelize) => {
    BalanceFactory(sequelize);
    ContentFactory(sequelize);
    PackageFactory(sequelize);
    SubscriptionFactory(sequelize);
    NotificationFactory(sequelize);

    User.hasMany(Balance, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Balance.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Balance, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Balance.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Content, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Content.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Content, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Content.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Package, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Package.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Package, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Package.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Subscription, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Subscription.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Subscription, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Subscription.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    User.hasMany(Notification, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Notification.belongsTo(User, { foreignKey: "user_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    User.hasMany(Notification, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Notification.belongsTo(User, { foreignKey: { name: "modified_by", allowNull: true }, onDelete: "RESTRICT", onUpdate: "CASCADE" })

    Package.hasMany(Subscription, { foreignKey: "package_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })
    Subscription.belongsTo(Package, { foreignKey: "package_id", onDelete: "RESTRICT", onUpdate: "CASCADE" })


}


export {
    Balance,
    Content,
    Package,
    Subscription,
    Notification
}

