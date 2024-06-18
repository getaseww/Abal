
import { Location } from "../models";

class LocationDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Location.create(payload)
                .then((result:Location) => resolve(result.get({plain:true})))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Location.findAll({
                where: query,
                raw: true,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Location[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Location.findOne({
                where: query,
            })
                .then((result:Location) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: number) => {
        return new Promise((resolve, reject) => {
            Location.findOne({
                where: { id },
            })
                .then((result: Location) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (location:Location, payload:any) => {
        return new Promise((resolve, reject) => {
            if (location) {
                if (payload.name!=null&&payload.name!="undefined") location.name = payload.name;
                if (payload.user_id!=null&&payload.user_id!="undefined") location.user_id = payload.user_id;
                if (payload.modified_by!=null&&payload.modified_by!="undefined") location.modified_by = payload.modified_by;
               
                location.save()
                    .then((result:Location) => {
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
            Location.destroy({ where: query })
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

export default new LocationDal;