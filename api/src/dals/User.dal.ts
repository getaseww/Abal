import { MembershipPlan } from '../models/MembershipPlan';
import { Payment } from '../models/Payment';
import { Profile } from '../models/Profile';
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
            User.findAll({
                where: query,
                include: [
                    User,
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
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: query,
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