import async from 'async'
import CustomError from '../errors/customError';
import { Payment } from '../models/Payment';
import PaymentDal from '../dals/Payment.dal';

class PaymentService {
    create(payload: Payment) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    PaymentDal.create(payload).then((result) => done(null, result))
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
            PaymentDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            PaymentDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    PaymentDal.findOne({ id })
                        .then((payment) => {
                            if (payment) {
                                done(null, payment)
                            } else {
                                done(new CustomError("Payment not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (payment:Payment, done:Function) => {
                    PaymentDal.update(payment, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Payment not found", 404, "Not Found"))
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
            PaymentDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Payment not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new PaymentService;