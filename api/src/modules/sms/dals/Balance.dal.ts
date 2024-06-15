import { Transaction } from 'sequelize';
import { Balance } from '../models';

class BalanceDal {
    create(payload: any,transaction?:Transaction) {
        return new Promise((resolve, reject) => {
            Balance.create(payload,{transaction})
                .then((result: Balance) => resolve(result.get({ plain: true })))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Balance.findAll({
                where: query,
                raw: true,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Balance[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Balance.findOne({
                where: query,
            })
                .then((result: Balance) => {
                    // console.log("res", result)
                    resolve(result)
                })
                .catch((error: any) => {
                    // console.log("error", error)
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Balance.findOne({
                where: { id },
            })
                .then((result: Balance) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (balance: any, payload: any,transaction?:Transaction) => {
        return new Promise((resolve, reject) => {
            if (balance) {
                if (payload.balance != null && payload.balance != "undefined") balance.balance = payload.balance;
                if (payload.used != null && payload.used != "undefined") balance.used = payload.used;
                if (payload.user_id != null && payload.user_id != "undefined") balance.user_id = payload.user_id;
                if (payload.modified_by != null && payload.modified_by != "undefined") balance.modified_by = payload.modified_by;

                balance.save({transaction})
                    .then((result: Balance) => {
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
            Balance.destroy({ where: query })
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

export default new BalanceDal;