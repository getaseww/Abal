import { Subscription } from "../models/Subscription";
import {Subscription as SubscriptionType} from '../types'

class SubscriptionDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Subscription.create(payload)
                .then((result:SubscriptionType) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Subscription.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:SubscriptionType[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: query,
            })
                .then((result:SubscriptionType) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Subscription.findOne({
                where: { id },
            })
                .then((result: SubscriptionType) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (subscription:Subscription, payload:any) => {
        return new Promise((resolve, reject) => {
            if (subscription) {
                // if (payload.firstName) subscription.firstName = payload.firstName;
                // if (payload.lastName) subscription.lastName = payload.lastName;
                // if (payload.email) subscription.email = payload.email;


               subscription.save()
                    .then((result:SubscriptionType) => {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve(null)
                        }
                    })
                    .catch((error:any) => {
                        reject(error)
                    });
            } else {
                resolve(null);
            }
        });
    }

    remove = (query:any) => {
        return new Promise((resolve, reject) => {
            Subscription.destroy({ where: query })
                .then((result:any) => {
                    if (result) {
                        resolve("Deleted successfully!")
                    } else {
                        resolve(null)
                    }
                })
                .catch((error:any) => reject(error));
        });
    }
}

export default new SubscriptionDal;