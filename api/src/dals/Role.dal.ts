import { Role } from "../models/Role";

class RoleDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Role.create(payload)
                .then((result:Role) => resolve(result))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Role.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Role[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Role.findOne({
                where: query,
            })
                .then((result:Role) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Role.findOne({
                where: { id },
            })
                .then((result: Role) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (role:Role, payload:any) => {
        return new Promise((resolve, reject) => {
            if (role) {
                if (payload.name) role.name = payload.name;
                // if (payload.lastName) Role.lastName = payload.lastName;
                // if (payload.email) Role.email = payload.email;


               role.save()
                    .then((result:Role) => {
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
            Role.destroy({ where: query })
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

export default new RoleDal;