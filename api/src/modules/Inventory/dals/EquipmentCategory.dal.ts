import { EquipmentCategory } from "../models";

class EquipmentCategoryDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            EquipmentCategory.create(payload)
                .then((result:EquipmentCategory) => resolve(result.get({plain:true})))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findAll({
                where: query,
                raw: true, 
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:EquipmentCategory[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findOne({
                where: query,
            })
                .then((result:EquipmentCategory) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            EquipmentCategory.findOne({
                where: { id },
            })
                .then((result: EquipmentCategory) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (equipment_category:EquipmentCategory, payload:any) => {
        return new Promise((resolve, reject) => {
            if (equipment_category) {
                if (payload.name!=null&&payload.name!="undefined") equipment_category.name = payload.name;
                if (payload.user_id!=null&&payload.user_id!="undefined") equipment_category.user_id = payload.user_id;
                if (payload.modified_by!=null&&payload.modified_by!="undefined") equipment_category.modified_by = payload.modified_by;
              

                equipment_category.save()
                    .then((result:EquipmentCategory) => {
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
            EquipmentCategory.destroy({ where: query })
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

export default new EquipmentCategoryDal;