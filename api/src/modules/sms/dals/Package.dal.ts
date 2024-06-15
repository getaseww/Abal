import { Package } from '../models';

class PackageDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Package.create(payload)
                .then((result:Package) => resolve(result.get({plain:true})))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Package.findAll({
                where: query,
                raw: true,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Package[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Package.findOne({
                where: query,
            })
                .then((result:Package) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Package.findOne({
                where: { id },
            })
                .then((result: Package) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (packageSMS:Package, payload:any) => {
        return new Promise((resolve, reject) => {
            if (packageSMS) {
                if (payload.name!=null&&payload.name!="undefined") packageSMS.name = payload.name;
                if (payload.description!=null&&payload.description!="undefined") packageSMS.description = payload.description;
                if (payload.price!=null&&payload.price!="undefined") packageSMS.price = payload.price;
                if (payload.quantity!=null&&payload.quantity!="undefined") packageSMS.quantity = payload.quantity;
                if (payload.user_id!=null&&payload.user_id!="undefined") packageSMS.user_id = payload.user_id;
                if (payload.modified_by!=null&&payload.modified_by!="undefined") packageSMS.modified_by = payload.modified_by;
               

                packageSMS.save()
                    .then((result:Package) => {
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
            Package.destroy({ where: query })
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

export default new PackageDal;