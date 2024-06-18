import { Transaction } from 'sequelize';
import { Equipment } from '../models';

class EquipmentDal {
    create(payload: any,transaction?:Transaction) {
        return new Promise((resolve, reject) => {
            Equipment.create(payload,{transaction})
                .then((result: Equipment) => resolve(result.get({ plain: true })))
                .catch((error: any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Equipment.findAll({
                where: query,
                raw: true,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Equipment[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query: any) => {
        return new Promise((resolve, reject) => {
            Equipment.findOne({
                where: query,
            })
                .then((result: Equipment) => {
                    // console.log("res", result)
                    resolve(result)
                })
                .catch((error: any) => {
                    // console.log("error", error)
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Equipment.findOne({
                where: { id },
            })
                .then((result: Equipment) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (equipment: Equipment, payload: any,transaction?:Transaction) => {
        return new Promise((resolve, reject) => {
            if (equipment) {
                if (payload.name != null && payload.name != "undefined") equipment.name = payload.name;
                if (payload.user_id != null && payload.user_id != "undefined") equipment.user_id = payload.user_id;
                if (payload.modified_by != null && payload.modified_by != "undefined") equipment.modified_by = payload.modified_by;

                equipment.save({transaction})
                    .then((result: Equipment) => {
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
            Equipment.destroy({ where: query })
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

export default new EquipmentDal;