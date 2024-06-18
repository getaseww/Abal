import async from 'async'
import { Notification } from '../models/Notification';
import { NotificationDal } from '../dals';
import { ErrorMessages } from '../../../errors/errors';

class NotificationService {
    create(payload: Notification) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    NotificationDal.create(payload).then((result) => done(null, result))
                        .catch((error) => {
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
            NotificationDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id: string) {
        return new Promise((resolve, reject) => {
            NotificationDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            NotificationDal.findOne(query).then((result) => {
                console.log("Notification from service", result)
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    NotificationDal.findOne({ id })
                        .then((notification) => {
                            if (notification) {
                                done(null, notification)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            done(error, null)
                        })
                },
                (notification: Notification, done: Function) => {
                    NotificationDal.update(notification, payload)
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
            NotificationDal.remove({ id })
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


export default new NotificationService;