import { Request, Response } from "express";
import { z } from 'zod'
import { Op } from "sequelize";
import { checkUnicode } from "../../../utils/helpers";
import logger from '../../../utils/loggers/winston'
import { ContentService } from "../services";
import { Balance, Content } from "../models";
import { BalanceDal } from "../dals";
import { Role } from "../../../enums";
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";


class ContentController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            title: z.string(),
            body: z.string(),
            phone_numbers: z.string(),
            status: z.string(),
            reference_txt: z.string().optional(),
            response: z.string().optional(),
            sent_date: z.string().optional(),
            modified_by: z.number().optional(),
        })



        try {
            const data = request.body;
            const user: any = request.user;

            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Failed to create content: ${JSON.parse(schemaResult.error)}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                ContentService.create({ ...data, user_id: user.id })
                    .then((result: Content) => {
                        response.status(200).json({ status: "success", data: result, message: "Content created successfully!" });
                    })
                    .catch((error: Error) => {
                        logger.error(`Failed to create Balance: ${JSON.parse(schemaResult.error)}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create content" });
                    });
            }
        } catch (error) {
            response.status(500).json({ status: "failed", error, message: "Failed to create content!" });
        }

    }

    static saveAndSend(request: Request, response: Response) {
        const schema = z.object({
            title: z.string(),
            body: z.string(),
            phone_numbers: z.string(),
            status: z.string(),
            reference_txt: z.string().optional(),
            response: z.string().optional(),
            sent_date: z.string().optional(),
            modified_by: z.number().optional(),
        })

        try {
            const data = request.body;
            const user: any = request.user;
            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Failed to create content: ${JSON.parse(schemaResult.error)}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {

                const phonenumbers_list = data.phone_numbers.split(',');
                const len = phonenumbers_list.length;
                console.log(phonenumbers_list)
                let count_sms = 1;

                BalanceDal.findOne({ user_id: user.id })
                    .then((res: Balance) => {
                        if (count_sms * len > (res.get({ plain: true }).balance - res.get({ plain: true }).used)) {
                            response.status(500).json({ error: "You don't have enought SMS balance", message: "You don't have enought SMS balance" });
                            return;
                        }
                    })
                    .catch((error) => {
                        response.status(500).json({ status: "failed", error, message: "Failed to create content!" });
                        return;
                    })
                ContentService.createAndSend({ ...data, user_id: user.id })
                    .then((result: Content) => {
                        response.status(200).json({ status: "success", data: result, message: "Content created successfully!" });
                    })
                    .catch((error: Error) => {
                        response.status(500).json({ status: "failed", error, message: "Failed to create content!" });
                    });
            }
        } catch (error) {
            response.status(500).json({ status: "failed", error, message: "Failed to create content!" });
        }
    }
    static send(request: Request, response: Response) {
        try {
            const contents = request.body;
            const user: any = request.user;
            const content_id = request.params.id;
            const len = contents.phone_numbers.length;
            let count_sms;
            if (checkUnicode(contents.body)) {
                count_sms = Math.ceil(contents.body.length / 70);
            } else {
                count_sms = Math.ceil(contents.body.length / 160)
            }
            BalanceDal.findOne({ user_id: contents.user_id })
                .then((res: Balance) => {
                    if (count_sms * len > (res.get({ plain: true }).balance - res.get({ plain: true }).used)) {
                        response.status(500).json({ status: "failed", error: "You don't have enought SMS balance", message: "You don't have enought SMS balance" });
                        return;
                    }
                })
                .catch((error) => {
                    response.status(500).json({ status: "failed", error, message: "Failed to send SMS content!" });
                    return;
                })

            ContentService.send({ ...contents, user_id: contents.user_id, id: content_id }).then((result) => {
                response.status(200).json({ status: "success", data: result, "message": "SMS conten send successfully!" });
            }).catch((error) => {
                response.status(500).json({ status: "failed", error, result: error, message: "Failed to send SMS content" });
            })
        } catch (error) {
            response.status(500).json({ status: "failed", error, result: error, message: "Failed to send SMS content" });
        }

    }

    static findById(request: Request, response: Response) {
        let id = request.params.id
        ContentService.findById(id)
            .then((result: Content) => {
                response.status(200).json({ status: "success", data: result, message: "Content fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", error, message: "Failed to find SMS message!", data: null });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.title && request.query.title != "undefined")
            query = { ...query, title: request.query.title }

        ContentService.findOne(query)
            .then((result: Content) => {
                response.status(200).json({ status: "success", data: result, message: "Content fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", error, message: "Failed to find sms message" });
            })
    }

    static findAll(request: Request, response: Response) {

        let query = {}
        const user: any = request.user
        if (request.query.name && request.query.name != "undefined") {
            query = {
                ...query, title: {
                    [Op.like]: `%${request.query.name}%`
                }
            }
        }

        if (user.role != Role.ADMIN) {
            query = {
                ...query,
                user_id: user.id
            }
        }


        ContentService.findAll(query)
            .then((result: Content[]) => {
                response.status(200).json({ status: "success", data: result, message: "Content fetched successfully!" })
            })
            .catch((error) => {
                response.status(500).json({ status: "failed", error, message: "Failed to find sms messages" });
            })
    }

    static update(request: Request, response: Response) {
        let id: number = parseInt(request.params.id);
        let payload = request.body;
        const user: any = request.user;
        payload.modified_by = user.id
        const schema = z.object({
            id: z.number(),
        })
        const result: any = schema.safeParse({ id })
        if (!result.success) {
            logger.error(`Failed to update content: ${JSON.parse(result.error)}`);
            response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: result.error, message: ErrorMessages.badRequestError });
        } else {
            ContentService.update(id, payload)
                .then((result) => {
                    if (result) {
                        response.status(200).json({ status: "success", data: result, message: "Content updated successfully!" })
                    } else {
                        response.status(404).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                    }
                }).catch((error) => {
                    response.status(error.status).json({ status: "failed", message: error.message, data: null });
                })
        }

    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        ContentService.remove(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "Content deleted successfully!" })
            })
            .catch((error) => response.status(500).json({ status: "failed", error, message: "Failed to delete content!" }))
    }
}

export default ContentController;
