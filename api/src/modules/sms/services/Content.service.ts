import async from 'async'
import { Content } from '../models/Content';
import { request } from 'http';
import { SMSSTATUS, checkUnicode } from '../../../utils/helpers';
import { sequelize } from '../../../config/db';
import { ContentDal } from '../dals';
import { SendMessage } from '../../../APIClient/afroSMSAPI';
import BalanceService from './Balance.service';
import { ErrorMessages } from '../../../errors/errors';

class ContentService {
    create(payload: Content) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    ContentDal.create(payload).then((result) => done(null, result))
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

    createAndSend(payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (callback: Function) => {
                    const messagePromises = [];
                    const phoneNumbers = payload.phone_numbers.split(",");
                    for (const phoneNumber of phoneNumbers) {
                        // Send a message for each phone number
                        const messagePromise = SendMessage(phoneNumber, payload.body)
                            .then((result) => {
                                // Log success for each message
                                console.log(`SMS sent to ${phoneNumber}: ${JSON.stringify(result)}`);
                            })
                            .catch((error) => {
                                // Log the error for each message
                                console.log(`Error sending SMS to ${phoneNumber}: ${error}`);
                            });

                        messagePromises.push(messagePromise);
                    }
                    callback(null, messagePromises)

                },
                (result: any, callback: Function) => {
                    if (result.length != 0) {
                        BalanceService.findOne({ user_id: payload.user_id })
                            .then((balanceResult) => {
                                callback(null, result, balanceResult)
                            })
                            .catch((error) => {
                                callback(error, null)
                            });
                    }
                    else {
                        callback("Error", null)
                    }

                },
                (bodyResult: any, balanceResult: any, callback: Function) => {

                    const phonenumbers_list = payload.phone_numbers.split(',');
                    const len = phonenumbers_list.length;
                    let count_sms;
                    if (checkUnicode(payload.body)) {
                        count_sms = Math.ceil(payload.body.length / 70);
                    } else {
                        count_sms = Math.ceil(payload.body.length / 160);
                    }
                    console.log("sms count " + count_sms + " len " + len)
                    BalanceService.update(balanceResult.id, { used: sequelize.literal(`used + ${count_sms * len}`) })
                        .then(() => callback(null, bodyResult))
                        .catch((error) => {
                            console.log("error 1 " + error)
                            callback(error, null)
                        });
                },
                (bodyResult: any, callback: Function) => {
                    const contentUpdatePayload = {
                        ...payload,
                        status: SMSSTATUS.APPPROVED,
                        sent_date: new Date().toISOString(),
                        reference_txt: bodyResult?.response?.campaign_id,
                    };

                    this.create(contentUpdatePayload)
                        .then((result) => {
                            callback(null, result);  // Resolve with the result
                        })
                        .catch((error) => {
                            callback(error, null);  // Reject with the error
                        });

                }
            ], (error: any, result: any) => {
                if (error) {

                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }


    send(payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (callback: Function) => {
                    const messagePromises = [];
                    const phoneNumbers = payload.phone_numbers;
                    for (const phoneNumber of phoneNumbers) {
                        // Send a message for each phone number
                        const messagePromise = SendMessage(phoneNumber, payload.body)
                            .then((result) => {
                                // Log success for each message
                                console.log(`SMS sent to ${phoneNumber}: ${JSON.stringify(result)}`);
                            })
                            .catch((error) => {
                                // Log the error for each message
                                console.log(`Error sending SMS to ${phoneNumber}: ${error}`);
                            });

                        messagePromises.push(messagePromise);
                    }
                    callback(null, messagePromises)
                    /*SendBulkMessage(payload.phone_numbers, payload.body)
                        .then((result) => {console.log("test sms" + JSON.stringify(result))
                            callback(null, result)})
                        .catch((error) =>{console.log("error 1.8 " + error)
                        callback(error, null)});*/
                },
                (result: any, callback: Function) => {
                    if (result.length != 0) {
                        BalanceService.findOne({ user_id: payload.user_id })
                            .then((balanceResult) => {
                                console.log("Balan" + JSON.stringify(balanceResult))
                                callback(null, result, balanceResult)
                            })
                            .catch((error) => {
                                console.log("error 1.3 " + error)
                                callback(error, null)
                            });
                    }
                    else {
                        console.log("custom Error 1")
                        callback("Error", null)
                    }

                },
                (bodyResult: any, balanceResult: any, callback: Function) => {
                    console.log("balance update" + JSON.stringify(bodyResult) + " Bal " + JSON.stringify(balanceResult));

                    const len = payload.phone_numbers.length;
                    let count_sms;
                    if (checkUnicode(payload.body)) {
                        count_sms = Math.ceil(payload.body.length / 70);
                    } else {
                        count_sms = Math.ceil(payload.body.length / 160);
                    }
                    BalanceService.update(balanceResult.id, { used: sequelize.literal(`used + ${count_sms * len}`) })
                        .then(() => callback(null, bodyResult))
                        .catch((error) => {
                            console.log("error 1 " + error)
                            callback(error, null)
                        });
                },
                (result: any, callback: Function) => {
                    console.log("content find" + payload.id)
                    this.findOne({ id: payload.id })
                        .then((contentResult) => {
                            console.log("Content" + JSON.stringify(contentResult))
                            callback(null, result, contentResult)
                        })
                        .catch((error) => {
                            console.log("error 2e " + error)
                            callback(error, null)
                        });
                },
                (bodyResult: any, contentResult: any, callback: Function) => {
                    console.log("content update")


                    this.update(contentResult.id, { status: SMSSTATUS.APPPROVED, sent_date: new Date().toISOString(), reference_txt: bodyResult?.response?.campaign_id })
                        .then(() => callback(null, bodyResult))
                        .catch((error) => {
                            console.log("error 3 " + error)
                            callback(error, null)
                        });
                }
            ], (error: any, result: any) => {
                if (error) {

                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }



    findAll(query: any) {
        return new Promise((resolve, reject) => {
            ContentDal.findAll(query).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }



    findById(id: string) {
        return new Promise((resolve, reject) => {
            ContentDal.findById(id).then((result) => resolve(result))
                .catch((error) => reject(error))
        })
    }

    findOne(query: any) {
        return new Promise((resolve, reject) => {
            ContentDal.findOne(query).then((result) => {
                resolve(result)
            })
                .catch((error) => reject(error))
        })
    }

    update(id: number, payload: any) {
        return new Promise((resolve, reject) => {
            async.waterfall([
                (done: Function) => {
                    ContentDal.findOne({ id })
                        .then((content) => {
                            if (content) {
                                done(null, content)
                            } else {
                                done(ErrorMessages.notFoundError, null);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            done(error, null)
                        })
                },
                (content: Content, done: Function) => {
                    ContentDal.update(content, payload)
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
            ContentDal.remove({ id })
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


export default new ContentService;