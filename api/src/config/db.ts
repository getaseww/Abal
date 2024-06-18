import { Sequelize, Transaction } from 'sequelize';
import env from 'dotenv';
import UserFactory, { User } from '../models/User';
import MembershipPlanFactory, { MembershipPlan } from '../models/MembershipPlan';
import PaymentFactory, { Payment } from '../models/Payment';
import SubscriptionFactory, { Subscription } from '../models/Subscription';
import RoleFactory, { Role } from '../models/Role';
import ProfileFactory, { Profile } from '../models/Profile';
import { SMSTables } from '../modules/sms/models';
import { InventoryTables } from '../modules/Inventory/models';


env.config()

export let sequelize: Sequelize;

export default async () => {

  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    logging: false,
  });

  UserFactory(sequelize);
  MembershipPlanFactory(sequelize);
  SubscriptionFactory(sequelize);
  PaymentFactory(sequelize);
  RoleFactory(sequelize);
  ProfileFactory(sequelize);
  SMSTables(sequelize);
  InventoryTables(sequelize);


  User.hasMany(User, { foreignKey: { name: "user_id", allowNull: true } })
  User.belongsTo(User, { foreignKey: { name: "user_id", allowNull: true } })
  User.hasOne(Profile, { foreignKey: { name: "user_id", allowNull: true } })
  Profile.belongsTo(User, { foreignKey: { name: "user_id", allowNull: true } })

  Role.hasMany(User, { foreignKey: "role_id" })
  User.belongsTo(Role, {
    foreignKey: "role_id"
  })

  User.hasMany(MembershipPlan, {
    foreignKey: 'user_id',
  })
  MembershipPlan.belongsTo(User, {
    foreignKey: 'user_id',
  });

  User.hasMany(Subscription, { foreignKey: 'user_id', })
  Subscription.belongsTo(User, { foreignKey: 'user_id', });

  User.hasMany(Subscription, { foreignKey: 'member_id', as: "member_subscriptions" })
  Subscription.belongsTo(User, { foreignKey: 'member_id', as: "subscriber" });

  MembershipPlan.hasMany(Subscription, { foreignKey: 'membership_plan_id', })
  Subscription.belongsTo(MembershipPlan, { foreignKey: 'membership_plan_id', });

  User.hasMany(Payment, { foreignKey: { name: "user_id" } })
  Payment.belongsTo(User, { foreignKey: { name: "user_id" } })

  User.hasMany(Payment, { foreignKey: { name: "member_id" }, as: "member_payments" })
  Payment.belongsTo(User, { foreignKey: { name: "member_id" }, as: "payer" })

  Subscription.hasMany(Payment, { foreignKey: { name: "subscription_id" } })
  Payment.belongsTo(Subscription, { foreignKey: { name: "subscription_id" } })


  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      console.log("connected")
    })
    .catch((error: any) => {
      console.log("database error", error)
    });
};


export const createTransaction = (): Promise<Transaction> => {
  return new Promise(async (resolve, reject) => {
    sequelize
      .transaction()
      .then((transaction) => {
        console.log("creating transaction")
        resolve(transaction)
      })
      .catch((error) => reject(error));
  });
};