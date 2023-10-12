import { Member } from "../models/Member";
import { Member as MemberType } from "../types";


class MemberDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Member.create(payload)
                .then((result:MemberType) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Member.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:MemberType[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Member.findOne({
                where: query,
            })
                .then((result:MemberType) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Member.findOne({
                where: { id },
            })
                .then((result: MemberType) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (member:Member, payload:any) => {
        return new Promise((resolve, reject) => {
            if (member) {
                if (payload.firstName) member.firstName = payload.firstName;
                if (payload.lastName) member.lastName = payload.lastName;
                if (payload.email) member.email = payload.email;


               member.save()
                    .then((result:MemberType) => {
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
            Member.destroy({ where: query })
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

export default new MemberDal;