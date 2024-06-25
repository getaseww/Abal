import { MembershipPlan } from "../models/MembershipPlan";

class MembershipPlanDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            MembershipPlan.create(payload)
                .then((result: MembershipPlan) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result: MembershipPlan[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            MembershipPlan.findOne({
                where: query,
            })
                .then((result: MembershipPlan) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
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

    update = (membership_plan: MembershipPlan, payload: any) => {
        return new Promise((resolve, reject) => {
            if (membership_plan) {
                if (payload.name) membership_plan.name = payload.name;                if (payload.name) membership_plan.name = payload.name;
                if (payload.duration) membership_plan.duration = payload.duration;
                if (payload.description) membership_plan.description = payload.description;
                if (payload.max_member) membership_plan.max_member = payload.max_member;
                if (payload.price) membership_plan.price = payload.price;
                if (payload.access_level) membership_plan.access_level = payload.access_level;


                membership_plan.save()
                    .then((result: MembershipPlan) => {
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
            MembershipPlan.destroy({ where: query })
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

export default new MembershipPlanDal;