import { Request, Response } from "express";
import MembershipPlanService from "../services/MembershipPlan.service";
import { MembershipPlan as MembershipPlanType, Error } from "../types";
import { BadRequestError, ErrorMessages, ErrorStatusNumber } from "../errors/errors";
import { z } from 'zod'
import logger from '../utils/loggers/winston'
import { Role } from "../enums";

class MembershipPlanController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            name: z.string(),
            description: z.string().optional(),
            price: z.number(),
            duration: z.number(),
            access_level: z.number(),
            max_member: z.number().optional(),
            image: z.string().optional()
        })


        try {
            const data = request.body;
            const user: any = request.user;
            data.user_id = user.id


            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Faile to create Membership plan: ${schemaResult.error}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {

                MembershipPlanService.create(data)
                    .then((result: MembershipPlanType) => {
                        response.status(200).json(result);
                    })
                    .catch((error: Error) => {
                        response.status(error.statusCode).json(error.message);
                    });
            }
        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));

            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });

        }

    }

    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id);
        MembershipPlanService.findById(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }
        MembershipPlanService.findOne(query)
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

        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }

        MembershipPlanService.findAll(query)
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
            id: z.string(),
        })
        // const { error, value } = schema.validate({ id: id })
        // if (!error) {
        MembershipPlanService.update(id, payload)
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
        MembershipPlanService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default MembershipPlanController;
