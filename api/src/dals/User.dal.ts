import { User as UserType } from '../types';
import { User } from '../models/User';

class UserDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            User.create(payload)
                .then((result:User) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            User.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:User[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: query,
            })
                .then((result:User) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            User.findOne({
                where: { id },
            })
                .then((result: User) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (user:User, payload:any) => {
        return new Promise((resolve, reject) => {
            if (user) {
                if (payload.firstName) user.firstName = payload.firstName;
                if (payload.lastName) user.lastName = payload.lastName;
                if (payload.email) user.email = payload.email;


               user.save()
                    .then((result:User) => {
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
            User.destroy({ where: query })
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

export default new UserDal;