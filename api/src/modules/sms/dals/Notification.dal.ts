import { Notification } from "../models";

class NotificationDal {
    create(payload:any) {
        return new Promise((resolve, reject) => {
            Notification.create(payload)
                .then((result:Notification) => resolve(result.get({plain:true})))
                .catch((error:any) => reject(error));
        });
    }

    findAll = (query:any) => {
        return new Promise((resolve, reject) => {
            Notification.findAll({
                where: query,
                raw: true,
                // orderBy:[
                //     {
                //         createdAt:'asc'
                //     }
                // ]
            })
                .then((result:Notification[]) => resolve(result))
                .catch((error:any) => reject(error));
        })
    }

    findOne = (query:any) => {
        return new Promise((resolve, reject) => {
            Notification.findOne({
                where: query,
                raw: true,
            })
                .then((result:Notification) => {
                    resolve(result)})
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    findById = (id: string) => {
        return new Promise((resolve, reject) => {
            Notification.findOne({
                where: { id },
                raw: true,
            })
                .then((result: Notification) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error)
                });
        });
    }

    update = (notification:Notification, payload:any) => {
        return new Promise((resolve, reject) => {
            if (notification) {
                if (payload.content_id!=null&&payload.content_id!="undefined") notification.content_id = payload.content_id;
                if (payload.resident_id!=null&&payload.resident_id!="undefined") notification.resident_id = payload.resident_id;
                if (payload.mobile_number!=null&&payload.mobile_number!="undefined") notification.mobile_number = payload.mobile_number;
                if (payload.is_sent!=null&&payload.is_sent!="undefined") notification.is_sent = payload.is_sent;
                if (payload.sent_date!=null&&payload.sent_date!="undefined") notification.sent_date = payload.sent_date;
                if (payload.reference_number!=null&&payload.reference_number!="undefined") notification.reference_number = payload.reference_number;
                if (payload.user_id!=null&&payload.user_id!="undefined") notification.user_id = payload.user_id;
                if (payload.modified_by!=null&&payload.modified_by!="undefined") notification.modified_by = payload.modified_by;
                
                notification.save()
                    .then((result:Notification) => {
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
            Notification.destroy({ where: query })
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

export default new NotificationDal;