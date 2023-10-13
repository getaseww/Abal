import { Request, Response } from "express";
import SubscriptionService from "../services/Subscription.service";
import { Subscription, Error } from "../types";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class SubscriptionController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            status: z.string(),
            membershipPlanId: z.number(),
            startDate: z.date(),
            endDate:z.date(),
        })

        const data = request.body;
        try {
            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(404).json(schemaResult);
            }
            SubscriptionService.create(data)
                .then((result: Subscription) => {
                    response.status(200).json(result);
                })
                .catch((error: Error) => {
                    
                    response.status(401).json(error);
                });
        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));
            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });
        }

    }
    static findById(request: Request, response: Response) {
        let id = request.params.id
        SubscriptionService.findById(id)
            .then((result: Subscription) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        SubscriptionService.findOne(query)
            .then((result: Subscription) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        SubscriptionService.findAll(query)
            .then((result: Subscription[]) => {
                response.status(200).json(result)
            })
            .catch((error: Error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static update(request: Request, response: Response) {
        let id = request.params.id;
        let payload = request.body;
        const schema = z.object({
            id: z.number(),
        })
        const result = schema.safeParse(id)
        if (!result.success) {
            response.status(404).json(result);
        }
        // const { error, value } = schema.validate({ id: id })
        // if (!error) {
        SubscriptionService.update(id, payload)
            .then((result) => {
                if (result) {
                    response.status(200).json(result)
                } else {
                    response.status(400).json("Can't update with this id!")
                }
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
        // } else {
        // let error = Error.badRequestError(error?.details[0]?.message)
        // res.status(error.status).json(error.message);
        // }
    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        SubscriptionService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default SubscriptionController;
