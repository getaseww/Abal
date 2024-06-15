import { MembershipPlan } from "../models/MembershipPlan";
import { Subscription } from "../models/Subscription";
import { User } from "../models/User";

class SubscriptionDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            Subscription.create(payload)
                .then((result: Subscription) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Subscription.findAll({
                where: query,
                include: [
                    { model: User, as: "subscriber" },
                    { model: MembershipPlan, }
                ]
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result: Subscription[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: query,
            })
                .then((result: Subscription) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: { id },
            })
                .then((result: Subscription) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (subscription: Subscription, payload: any) => {
        return new Promise((resolve, reject) => {
            if (subscription) {
                if (payload.member_id) subscription.member_id = payload.member_id;
                if (payload.membership_plan_id) subscription.membership_plan_id = payload.membership_plan_id;
                if (payload.start_date) subscription.start_date = payload.start_date;
                if (payload.end_date) subscription.end_date = payload.end_date;


                subscription.save()
                    .then((result: Subscription) => {
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
            Subscription.destroy({ where: query })
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

export default new SubscriptionDal;