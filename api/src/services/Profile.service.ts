import async from 'async'
import CustomError from '../errors/customError';
import { Profile } from '../models/Profile';
import ProfileDal from '../dals/Profile.dal';

class ProfileService {
    create(payload: Profile) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    if (payload.id) {
                        this.update(payload.id, payload)
                            .then((result) => done(null, result))
                            .catch((error) => {
                                done(new CustomError(error, 500, "Internal Server Error"), null)
                            })
                    } else {
                        ProfileDal.create(payload)
                            .then((result) => done(null, result))
                            .catch((error) => {
                                done(new CustomError(error, 500, "Bad Request"), null)
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
            ProfileDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }



    findById(id: number) {
        return new Promise((resolve, reject) => {
            ProfileDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            ProfileDal.findOne(query).then((result) => resolve(result))
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    ProfileDal.findOne({ id })
                        .then((profile) => {
                            if (profile) {
                                done(null, profile)
                            } else {
                                done(new CustomError("profile not found", 404, "Not Found"), null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(new CustomError(error, 500, "Internal Server Error"), null)
                        })
                },
                (profile: Profile, done: Function) => {
                    ProfileDal.update(profile, payload)
                        .then((result) => {
                            if (result) {
                                done(null, result)
                            } else {
                                done(new CustomError("Profile not found", 404, "Not Found"))
                            }
                        })
                        .catch((error) => {
                            done(new CustomError(error, 500, "Internal Server Error"))
                        })
                }
            ], (error: any, result: any) => {
                if (error) reject(error)
                else resolve(result)
            })
        })
    }

    remove(id: number) {
        return new Promise((resolve, reject) => {
            ProfileDal.remove({ id })
                .then((result) => {
                    if (result) {
                        resolve(result)
                    } else {
                        reject(new CustomError("Profile not found  with this id", 404, "Not Found"))
                    }
                })
                .catch((error) => reject(new CustomError(error, 500, "Internal Server Error")))
        })
    }

}


export default new ProfileService;