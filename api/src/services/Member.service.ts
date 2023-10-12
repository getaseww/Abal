import async from 'async'
import CustomError from '../errors/customError';
import { Member } from '../models/Member';
import MemberDal from '../dals/Member.dal';

class MemberService {
    create(payload: Member) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    MemberDal.create(payload).then((result) => done(null, result))
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
            MemberDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id:any) {
        return new Promise((resolve, reject) => {
            MemberDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query:any) {
        return new Promise((resolve, reject) => {
            MemberDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id:string, payload:any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done:Function) => {
                    MemberDal.findOne({ id })
                        .then((member) => {
                            if (member) {
                                done(null, member)
                            } else {
                                done(new CustomError("Member not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (member:Member, done:Function) => {
                    MemberDal.update(member, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Member not found", 404, "Not Found"))
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
            MemberDal.remove({ id})
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Subscription not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new MemberService;