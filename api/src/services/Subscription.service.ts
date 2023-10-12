import async from 'async'
import CustomError from '../errors/customError';
import { Subscription } from '../models/Subscription';
import SubscriptionDal from '../dals/Subscription.dal';

class SubscriptionService {
    create(payload: Subscription) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    SubscriptionDal.create(payload).then((result) => done(null, result))
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:any) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    SubscriptionDal.findOne({ id })
                        .then((subscription) => {
                            if (subscription) {
                                done(null, subscription)
                            } else {
                                done(new CustomError("Subscription not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (subscription:Subscription, done:Function) => {
                    SubscriptionDal.update(subscription, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Subscription not found", 404, "Not Found"))
                            }
                        })
                        .catch((error) => {
                            done(new CustomError(error, 500, "Internal Server Error"))
                        })
                }
            ], (error:any, result:any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id:string) {
        return new Promise((resolve, reject) => {
            SubscriptionDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Subscription not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new SubscriptionService;