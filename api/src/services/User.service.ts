import async from 'async'
import UserDal from '../dals/User.dal'
import CustomError from '../errors/customError';
import { User } from '../models/User';
import { encryptPassword } from '../utils/util';

class UserService {
    create(payload: User) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    const { password, ...data } = payload
                    const encPassword = encryptPassword(password)
                    UserDal.create({password:encPassword,...data}).then((result) => done(null, result))
                        .catch((error) => {
                            console.log(error);
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
            UserDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:number) {
        return new Promise((resolve, reject) => {
            UserDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            UserDal.findOne(query).then((result) => {
                resolve(result)})
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:number, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    UserDal.findOne({ id })
                        .then((user) => {
                            if (user) {
                                done(null, user)
                            } else {
                                done(new CustomError("User not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (user:User, done:Function) => {
                    UserDal.update(user, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("User not found", 404, "Not Found"))
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

    remove(id:number) {
        return new Promise((resolve, reject) => {
            UserDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("User not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }
}


export default new UserService;