import { Request, Response } from "express";
import MemberService from "../services/Member.service";
import { Member as MemberType, Error } from "../types";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'

class MemberController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string().email(),
            phoneNumber: z.string().min(10).max(10),
            sex: z.string(),
        })

        const data = request.body;
        try {
            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(404).json(schemaResult);
            }
            MemberService.create(data)
                .then((result: MemberType) => {
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
        MemberService.findById(id)
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
        MemberService.findOne(query)
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

        MemberService.findAll(query)
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
            id: z.number(),
        })
        const result = schema.safeParse(id)
        if (!result.success) {
            response.status(404).json(result);
        }

        MemberService.update(id, payload)
            .then((result) => {
                if (result) {
                    response.status(200).json(result)
                } else {
                    response.status(400).json("Can't update with this id!")
                }
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        MemberService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default MemberController;
