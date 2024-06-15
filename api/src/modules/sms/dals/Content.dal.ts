import { Content } from '../models';

class ContentDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Content.create(payload)
                .then((result:Content) => resolve(result.get({plain:true})))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Content.findAll({
                where: query,
                raw: true, 
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Content[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Content.findOne({
                where: query,
            })
                .then((result:Content) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Content.findOne({
                where: { id },
            })
                .then((result: Content) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (content:Content, payload:any) => {
        return new Promise((resolve, reject) => {
            if (content) {
                if (payload.title!=null&&payload.title!="undefined") content.title = payload.title;
                if (payload.body!=null&&payload.body!="undefined") content.body = payload.body;
                if (payload.reference_txt!=null&&payload.reference_txt!="undefined") content.reference_txt = payload.reference_txt;
                if (payload.message_status!=null&&payload.message_status!="undefined") content.message_status = payload.message_status;
                if (payload.status!=null&&payload.status!="undefined") content.status = payload.status;
                if (payload.phone_numbers!=null&&payload.phone_numbers!="undefined") content.phone_numbers = payload.phone_numbers;
                if (payload.sent_date!=null&&payload.sent_date!="undefined") content.sent_date = payload.sent_date;
                if (payload.user_id!=null&&payload.user_id!="undefined") content.user_id = payload.user_id;
                if (payload.modified_by!=null&&payload.modified_by!="undefined") content.modified_by = payload.modified_by;
              

                content.save()
                    .then((result:Content) => {
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
            Content.destroy({ where: query })
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

export default new ContentDal;