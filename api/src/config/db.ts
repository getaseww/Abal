import { Sequelize } from 'sequelize';
import env from 'dotenv';
import UserFactory, { User } from '../models/User';
import MembershipPlanFactory, { MembershipPlan } from '../models/MembershipPlan';
import PaymentFactory, { Payment } from '../models/Payment';
import SubscriptionFactory, { Subscription } from '../models/Subscription';
import RoleFactory, { Role } from '../models/Role';

env.config()

export let sequelize: Sequelize;

export default async () => {

  sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectOptions: { decimalNumbers: true },
    logging: false,
  });

  UserFactory(sequelize),
    MembershipPlanFactory(sequelize),
    SubscriptionFactory(sequelize),
    PaymentFactory(sequelize),
    RoleFactory(sequelize),

    Role.hasMany(User, { foreignKey: "role_id" })
  User.belongsTo(Role, {
    foreignKey: "role_id"
  })

  User.hasMany(MembershipPlan, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  MembershipPlan.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });


  User.hasMany(Subscription, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Subscription.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  User.hasMany(Subscription, {
    foreignKey: 'member_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Subscription.belongsTo(User, {
    foreignKey: 'memberId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  MembershipPlan.hasMany(Subscription, {
    foreignKey: 'membership_plan_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  Subscription.belongsTo(MembershipPlan, {
    foreignKey: 'membership_plan_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });


  sequelize
    .sync({ force: false, alter: false })
    .then((sequelize) => {
      console.log("connected")
    })
    .catch((error: any) => {
      console.log("database error", error)
    });
};

