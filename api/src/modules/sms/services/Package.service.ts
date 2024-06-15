import async from 'async'
import { Package } from '../models/Package';
import { PackageDal } from '../dals';
import { ErrorMessages } from '../../../errors/errors';

class PackageService {
    create(payload: Package) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    PackageDal.create(payload).then((result) => done(null, result))
                        .catch((error) => {
                            done(error, null)
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    findAll(query: any) {
        return new Promise((resolve, reject) => {
            PackageDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id:string) {
        return new Promise((resolve, reject) => {
            PackageDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            PackageDal.findOne(query).then((result) => {
                console.log("Package from service",result)
                resolve(result)})
                .catch((error) => reject(error))
        })
    }

    update(id:number, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    PackageDal.findOne({ id })
                        .then((packageM) => {
                            if (packageM) {
                                done(null, packageM)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                },
                (packageM:Package, done:Function) => {
                    PackageDal.update(packageM, payload)
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
            ], (error:any, result:any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id:string) {
        return new Promise((resolve, reject) => {
            PackageDal.remove({ id})
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


export default new PackageService;