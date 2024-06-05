import { Request, Response } from "express";
import PaymentService from "../services/Payment.service";
import { Payment, Error } from "../types";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class PaymentController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            amount: z.number().positive(),
            trx_ref: z.string(),
            status: z.string(),
            subscription_id: z.number(),
            user_id: z.number(),
            member_id: z.number(),
            password: z.string(),
        })

        const data = request.body;
        try {
            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(404).json(schemaResult);
            }
            PaymentService.create(data)
                .then((result: Payment) => {
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
        PaymentService.findById(id)
            .then((result: Payment) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        PaymentService.findOne(query)
            .then((result: Payment) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        PaymentService.findAll(query)
            .then((result: Payment[]) => {
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
        PaymentService.update(id, payload)
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
        PaymentService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default PaymentController;
