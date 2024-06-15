import { Transaction } from "sequelize";
import { Subscription, Package } from "../models";

class SubscriptionDal {
    create(payload: any, transaction?: Transaction) {
        return new Promise((resolve, reject) => {
            Subscription.create(payload, { transaction })
                .then((result: Subscription) => resolve(result.get({ plain: true })))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Subscription.findAll({
                where: query,
                // raw: true,
                include: [
                    Package
                ],
                order: [['createdAt', 'desc']]
            })
                .then((result: Subscription[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: query,
                // raw: true,
            })
                .then((result: Subscription) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: { id },
                raw: true,
            })
                .then((result: Subscription) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (subscription: Subscription, payload: any, transaction?: Transaction) => {
        return new Promise((resolve, reject) => {
            if (subscription) {

                if (payload.package_id != null && payload.package_id != "undefined") subscription.package_id = payload.package_id;
                if (payload.used != null && payload.used != "undefined") subscription.used = payload.used;
                if (payload.is_approved != null && payload.is_approved != "undefined") subscription.is_approved = payload.is_approved;
                if (payload.is_active != null && payload.is_active != "undefined") subscription.is_active = payload.is_active;
                if (payload.modified_by != "undefined") subscription.modified_by = payload.modified_by;
                if (payload.amount != "undefined") subscription.amount = payload.amount;

                subscription.save({ transaction })
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