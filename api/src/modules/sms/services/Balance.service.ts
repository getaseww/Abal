import async from 'async'
import { Balance } from '../models/Balance';
import { BalanceDal } from '../dals';
import { sequelize } from '../../../config/db';
import { ErrorMessages } from '../../../errors/errors';

class BalanceService {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    BalanceDal.findOne({ user_id: payload.user_id })
                        .then((result) => done(null, result))
                        .catch((error) => done(error, null))
                },
                (result: any, done: Function) => {
                    if (result != null && result != undefined) {
                        BalanceDal.update(result.id, { balance: sequelize.literal(`balance + ${payload.quantity}`) })
                    } else {
                        BalanceDal.create(payload).then((result) => done(null, result))
                            .catch((error) => {
                                done(error, null)
                            })
                    }
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            BalanceDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findById(id: string) {
        return new Promise((resolve, reject) => {
            BalanceDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            BalanceDal.findOne(query).then((result: Balance) => {
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    BalanceDal.findOne({ id })
                        .then((balance) => {
                            if (balance) {
                                done(null, balance)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            done(error, null)
                        })
                },
                (balance: Balance, done: Function) => {
                    BalanceDal.update(balance, payload)
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
            BalanceDal.remove({ id })
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


export default new BalanceService;