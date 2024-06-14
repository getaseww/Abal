import async from 'async'
import CustomError from '../errors/customError';
import { Role } from '../models/Role';
import RoleDal from '../dals/Role.dal';

class RoleService {
    create(payload: Role) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    RoleDal.create(payload).then((result) => done(null, result))
                        .catch((error) => {
                            done(new CustomError(error,500,"Bad Request"), null)
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
            RoleDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:any) {
        return new Promise((resolve, reject) => {
            RoleDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            RoleDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    RoleDal.findOne({ id })
                        .then((Role) => {
                            if (Role) {
                                done(null, Role)
                            } else {
                                done(new CustomError("Role not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (role:Role, done:Function) => {
                    RoleDal.update(role, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Role not found", 404, "Not Found"))
                            }
                        })
                        .catch((error) => {
                            done(new CustomError(error, 500, "Internal Server Error"))
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
            RoleDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Role not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new RoleService;