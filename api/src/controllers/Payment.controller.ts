import { Request, Response } from "express";
import PaymentService from "../services/Payment.service";
import { Payment, Error } from "../types";
import { BadRequestError, ErrorMessages } from "../errors/errors";
import { z } from 'zod'
import { Role } from "../enums";

class PaymentController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            amount: z.number().positive(),
            trx_ref: z.string(),
            status: z.string().optional(),
            subscription_id: z.number(),
            member_id: z.number(),
        })



        try {
            const data = request.body;
            const user: any = request.user;
            data.user_id = user.id

            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(400).json({ status: "failed", message: ErrorMessages.badRequestError, error: ErrorMessages.badRequestError })
            } else {
                PaymentService.create(data)
                    .then((result: Payment) => {
                        response.status(200).json({ status: "success", data: result, message: "created successfully!" })
                    })
                    .catch((error: Error) => {
                        response.status(500).json({ status: "failed", error })
                    });
            }

        } catch (error) {
            let err = new BadRequestError(error);
            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });
        }

    }
    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id);
        PaymentService.findById(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        PaymentService.findOne(query)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch data!", error });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        const user: any = request.user;
        if (user?.role == Role.OWNER) {
            query = { ...query, user_id: user.id }
        }

        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        PaymentService.findAll(query)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch data!", error });
            })
    }

    static update(request: Request, response: Response) {
        let id = parseInt(request.params.id);
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
        let id = parseInt(request.params.id);
        PaymentService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default PaymentController;
