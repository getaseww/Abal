import async from 'async'

import { Subscription } from '../models/Subscription';
import { createTransaction, sequelize } from '../../../config/db';
import { Transaction } from 'sequelize';
import { BalanceDal, SubscriptionDal } from '../dals';
import { BalanceService } from '.';
import { ErrorMessages } from '../../../errors/errors';

class SubscriptionService {
    create(payload: Subscription) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    createTransaction()
                        .then((transaction) => done(null, transaction))
                        .catch((error) => done("Internal server error:" + error));
                },
                (transaction: Transaction, done: Function) => {

                    if (payload.id) {
                        console.log("subscription with id")
                        this.update(payload.id, payload, transaction)
                            .then((result) => {
                                if (result) done(null, transaction, result)
                                else done("Faile to approve subscription", { transaction })
                            }).catch((error) => done("Faile to approve subscription", { transaction }))
                    } else {
                        console.log("subscription without id")
                        SubscriptionDal.create(payload)
                            .then((result) => done(null, transaction, result))
                            .catch((error) => {
                                done(error, { transaction });
                            });
                    }

                },
                (transaction: Transaction, result: any, done: Function) => {
                    console.log("find balance with id",result)

                    BalanceDal.findOne({ user_id: payload.user_id })
                        .then((balanceResult) => done(null, transaction, result, balanceResult))
                        .catch((error) => done(error, { transaction, result }));
                },
                (transaction: Transaction, result: any, balanceResult: any, done: Function) => {
                   console.log("balance",payload,result,balanceResult)
                    if (payload.is_approved && balanceResult) {
                        console.log("update balance with id")
                        BalanceService.update(balanceResult.id, { balance: sequelize.literal(`balance + ${payload.quantity}`) })
                            .then((updateResult) => done(null, { transaction, result, updateResult }))
                            .catch((error) => {
                                done(error, { transaction, result })
                            });
                    } else if (payload.is_approved) {
                        console.log("update balance without id")

                        BalanceDal.create({ balance: payload.quantity, user_id: payload.user_id })
                            .then((createResult) => done(null, { transaction, result, createResult }))
                            .catch((error) => done(error, { transaction, result }));
                    } else {
                        console.log("create subscription", result)
                        done(null, { transaction, result })
                    }
                }
            ], (error, { transaction, result }) => {
                if (error) {
                    if (transaction) {
                        transaction.rollback();
                    }
                    reject(error);
                } else {
                    if (transaction) {
                        transaction.commit();
                    }
                    resolve(result);
                }
            });
        });
    }


    findAll(query: any) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id: string) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findOne(query).then((result) => {
                console.log("Subscription from service", result)
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any, transaction?: Transaction) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    SubscriptionDal.findOne({ id })
                        .then((subscription) => {
                            if (subscription) {
                                done(null, subscription)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                },
                (subscription: Subscription, done: Function) => {
                    SubscriptionDal.update(subscription, payload, transaction)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(ErrorMessages.notFoundError)
                            }
                        })
                        .catch((error) => {
                            done(error)
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id: string) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.remove({ id })
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(ErrorMessages.notFoundError)
                    }
                })
                .catch((error) => reject(error))
        })
    }
}


export default new SubscriptionService;