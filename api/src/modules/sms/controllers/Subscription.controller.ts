import { Request, Response } from "express";
import { z } from 'zod'
import { Subscription } from "../models/Subscription";
import logger from '../../../utils/loggers/winston'
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";
import { SubscriptionService } from "../services";
import { Role } from "../../../enums";


class SubscriptionController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            package_id: z.number(),
            amount: z.number(),
            quantity: z.number().optional(),
        })


        try {
            const data = request.body;
            const user: any = request.user;

            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Failed to create sms subscription: ${JSON.parse(schemaResult.error)}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                SubscriptionService.create({ ...data, user_id: data.user_id ? data.user_id : user.id })
                    .then((result: Subscription) => {
                        response.status(200).json({ status: "success", data: result, message: "Subscription created successfully!" });
                    })
                    .catch((error) => {
                        logger.error(`Failed to create sms subscription: ${error}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create sms subscription" });
                    });
            }

        } catch (error) {
            logger.error(`Failed to create sms subscription: ${error}`);
            response.status(500).json({ status: "failed", error: error, message: "Failed to create sms subscription" });
        }
    }
    static findById(request: Request, response: Response) {
        let id = request.params.id
        SubscriptionService.findById(id)
            .then((result: Subscription) => {
                response.status(200).json({ status: "success", data: result, message: "Subscription fetched successfully!" })
            }).catch((error) => {
                logger.error(`Failed to fetch sms subsription: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to fetch sms subsription" });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        SubscriptionService.findOne(query)
            .then((result: Subscription) => {
                response.status(200).json({ status: "success", data: result, message: "Subscription fetched successfully!" })
            }).catch((error) => {
                logger.error(`Failed to fetch sms subsription: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to fetch sms subsription" });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        const user: any = request.user
        if (user.role != Role.ADMIN) {
            query = {
                ...query,
                user_id: user.id
            }
        }
        SubscriptionService.findAll(query)
            .then((result: Subscription[]) => {
                response.status(200).json({ status: "success", data: result, message: "Subscription fetched successfully!" })
            })
            .catch((error: Error) => {
                logger.error(`Failed to fetch sms subsription: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to fetch sms subsription" });
            })
    }

    static update(request: Request, response: Response) {
        let id: number = parseInt(request.params.id);
        let payload = request.body;
        const user: any = request.user;

        const schema = z.object({
            id: z.number(),
        })
        const result: any = schema.safeParse({ id })
        if (!result.success) {
            logger.error(`Failed to update sms subscription: ${JSON.parse(result.error)}`);
            response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: result.error, message: ErrorMessages.badRequestError });
        }
        SubscriptionService.update(id, { ...payload, modified_by: user.id })
            .then((result) => {
                if (result) {
                    response.status(200).json({ status: "success", data: result, message: "Subscription updated successfully!" })
                } else {
                    response.status(404).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                }
            }).catch((error) => {
                logger.error(`Failed to update sms subsription: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to update sms subsription" });
            })
    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        SubscriptionService.remove(id)
            .then((result) => { response.status(200).json({ status: "success", data: result, message: "Subscription deleted successfully!" }) })
            .catch((error) => {
                logger.error(`Failed to delete sms subsription: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to delete sms subsription" });

            })
    }
}

export default SubscriptionController;
