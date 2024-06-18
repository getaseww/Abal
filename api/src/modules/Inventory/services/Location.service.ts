import async from 'async'
import { ErrorMessages } from '../../../errors/errors';
import { LocationDal } from '../dals';
import { Location } from '../models';

class LocationService {
    create(payload: Location) {
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
                        LocationDal.create(payload)
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
            LocationDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id: number) {
        return new Promise((resolve, reject) => {
            LocationDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            LocationDal.findOne(query).then((result) => {
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    LocationDal.findOne({ id })
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
                (location: Location, done: Function) => {
                    LocationDal.update(location, payload)
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
            LocationDal.remove({ id })
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


export default new LocationService;