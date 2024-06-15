import { Payment } from "../models/Payment";
import { User } from "../models/User";

class PaymentDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            Payment.create(payload)
                .then((result: Payment) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Payment.findAll({
                where: query,
                include: [
                    { model: User, as: "payer" }
                ]
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result: Payment[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Payment.findOne({
                where: query,
            })
                .then((result: Payment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Payment.findOne({
                where: { id },
            })
                .then((result: Payment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (payment: Payment, payload: any) => {
        return new Promise((resolve, reject) => {
            if (payment) {
                if (payload.amount) payment.amount = payload.amount;
                if (payload.status) payment.status = payload.status;
                if (payload.date) payment.date = payload.date;


                payment.save()
                    .then((result: Payment) => {
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
            Payment.destroy({ where: query })
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

export default new PaymentDal;