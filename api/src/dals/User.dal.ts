import { MembershipPlan } from '../models/MembershipPlan';
import { Payment } from '../models/Payment';
import { Profile } from '../models/Profile';
import { Role } from '../models/Role';
import { Subscription } from '../models/Subscription';
import { User } from '../models/User';

class UserDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            User.create(payload)
                .then((result: User) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            const { user, ...other } = query;

            let user_query = {};
            if (user) { user_query = user }
            console.log("find all")
            User.findAll({
                where: other,
                attributes: { exclude: ['password'] },
                include: [
                    // {
                    //     model: User, where: user_query, required: true, attributes: { exclude: ['password'] },
                    // },
                    { model: Payment, as: "member_payments" },
                    Payment,
                    { model: Subscription, as: "member_subscriptions" },
                    Subscription,
                    MembershipPlan,
                    Profile
                ]
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result: User[]) => resolve(result))
                .catch((error: any) => {
                    console.log("user error", error)
                    reject(error)
                });
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: query,
                include: [
                    Role
                ]
            })
                .then((result: User) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: { id },
                include: [Role]
            })
                .then((result: User) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (user: User, payload: any) => {
        return new Promise((resolve, reject) => {
            if (user) {
                if (payload.first_name) user.first_name = payload.first_name;
                if (payload.last_name) user.last_name = payload.last_name;
                if (payload.phone_number) user.phone_number = payload.phone_number;
                if (payload.company_category) user.company_category = payload.company_category;
                if (payload.password) user.password = payload.password;

                user.save()
                    .then((result: User) => {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    })
                    .catch((error: any) => {
                        reject(error)
                    });
            } else {
                resolve(null);
            }
        });
    }

    remove = (query: any) => {
        return new Promise((resolve, reject) => {
            User.destroy({ where: query })
                .then((result: any) => {
                    if (result) {
                        resolve("Deleted successfully!")
                    } else {
                        resolve(null)
                    }
                })
                .catch((error: any) => reject(error));
        });
    }
}

export default new UserDal;