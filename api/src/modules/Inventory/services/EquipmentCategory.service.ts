import async from 'async'
import { ErrorMessages } from '../../../errors/errors';
import { EquipmentCategoryDal } from '../dals';
import { EquipmentCategory } from '../models';

class EquipmentCategoryService {
    create(payload: EquipmentCategory) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    if (payload.id) {
                        this.update(payload.id, payload)
                            .then((result) => done(null, result))
                            .catch((error) => {
                                done(error, null)
                            })
                    } else {
                        EquipmentCategoryDal.create(payload)
                            .then((result) => done(null, result))
                            .catch((error) => {
                                done(error, null)
                            })
                    }
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id: number) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.findOne(query).then((result) => {
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    EquipmentCategoryDal.findOne({ id })
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            done(error, null)
                        })
                },
                (equipment_category: EquipmentCategory, done: Function) => {
                    EquipmentCategoryDal.update(equipment_category, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(ErrorMessages.notFoundError)
                            }
                        })
                        .catch((error) => {
                            done(error)
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id: string) {
        return new Promise((resolve, reject) => {
            EquipmentCategoryDal.remove({ id })
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(ErrorMessages.notFoundError)
                    }
                })
                .catch((error) => reject(error))
        })
    }
}


export default new EquipmentCategoryService;