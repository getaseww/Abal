import { Sequelize } from 'sequelize';
import env from 'dotenv';
import UserFactory,{User} from '../models/User';
import MembershipPlanFactory,{MembershipPlan} from '../models/MembershipPlan';
import PaymentFactory,{Payment} from '../models/Payment';
import SubscriptionFactory,{Subscription} from '../models/Subscription';
import MemberFactory,{Member} from '../models/Member';


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
  MemberFactory(sequelize),
  MembershipPlanFactory(sequelize),
  SubscriptionFactory(sequelize),
  PaymentFactory(sequelize),
  
  User.hasMany(Member,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  });

  Member.belongsTo(User,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  });

  User.hasMany(MembershipPlan,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  MembershipPlan.belongsTo(User,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  });


  User.hasMany(Subscription,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  Subscription.belongsTo(User,{
    foreignKey:'userId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  });

  Member.hasMany(Subscription,{
    foreignKey:'memberId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  Subscription.belongsTo(Member,{
    foreignKey:'memberId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  });

  MembershipPlan.hasMany(Subscription,{
    foreignKey:'membershipPlanId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
  })
  Subscription.belongsTo(MembershipPlan,{
    foreignKey:'membershipPlanId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
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

