import { MembershipPlan } from "../models/MembershipPlan";

class MembershipPlanDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            MembershipPlan.create(payload)
                .then((result:MembershipPlan) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:MembershipPlan[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findOne({
                where: query,
            })
                .then((result:MembershipPlan) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findOne({
                where: { id },
            })
                .then((result: MembershipPlan) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (membershipPlan:MembershipPlan, payload:any) => {
        return new Promise((resolve, reject) => {
            if (membershipPlan) {
                // if (payload.firstName) subscription.firstName = payload.firstName;
                // if (payload.lastName) subscription.lastName = payload.lastName;
                // if (payload.email) subscription.email = payload.email;


                membershipPlan.save()
                    .then((result:MembershipPlan) => {
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
            MembershipPlan.destroy({ where: query })
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

export default new MembershipPlanDal;