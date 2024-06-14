import { Profile } from "../models/Profile";

class ProfileDal {
    create(payload: any) {
        return new Promise((resolve, reject) => {
            Profile.create(payload)
                .then((result: Profile) => resolve(result))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query: any) => {
        return new Promise((resolve, reject) => {
            Profile.findAll({
                where: query,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result: Profile[]) => resolve(result))
                .catch((error: any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Profile.findOne({
                where: query,
            })
                .then((result: Profile) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Profile.findOne({
                where: { id },
            })
                .then((result: Profile) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (profile: Profile, payload: any) => {
        return new Promise((resolve, reject) => {
            if (profile) {
                if (payload.sex) profile.sex = payload.sex;
                if (payload.bmi) profile.bmi = payload.bmi;
                if (payload.address) profile.address = payload.address;


                profile.save()
                    .then((result: Profile) => {
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
            Profile.destroy({ where: query })
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

export default new ProfileDal;