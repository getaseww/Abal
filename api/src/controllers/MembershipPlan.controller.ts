import { Request, Response } from "express";
import MembershipPlanService from "../services/MembershipPlan.service";
import { MembershipPlan as MembershipPlanType, Error } from "../types";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class MembershipPlanController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            name: z.string(),
            description: z.string().optional(),
            price:z.number(),
            duration:z.string(),
            maxMembers:z.number(),
            image:z.string().optional()
        })

        const data = request.body;

        let user: any = request.user;

        const userId:number=user.id;
        try {
            schema.parseAsync({...data,userId})
            MembershipPlanService.create(data)
                .then((result: MembershipPlanType) => {
                    response.status(200).json(result);
                })
                .catch((error: Error) => {
                    response.status(error.statusCode).json(error.message);
                });
        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));

            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });

        }

    }

    static findById(request: Request, response: Response) {
        let id = request.params.id
        MembershipPlanService.findById(id )
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }
            MembershipPlanService.findOne(query)
            .then((result) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.quantity && request.query.quantity != "undefined")
            query = { ...query, quantity: request.query.quantity }

            MembershipPlanService.findAll(query)
            .then((result) => {
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
        let id = request.params.id;
        MembershipPlanService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default MembershipPlanController;
