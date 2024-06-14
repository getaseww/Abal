import { Request, Response } from "express";
import { Error } from "../types";
import { BadRequestError } from "../errors/errors";
import { z } from 'zod'
import RoleService from "../services/Role.service";
import { Role } from "../models/Role";


class RoleController {

    static create(request: Request, response: Response) {
        const schema = z.object({
            name: z.string(),
        })

        const data = request.body;
        try {
            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(400).json(schemaResult);
            } else {
                RoleService.create(data)
                    .then((result: Role) => {
                        response.status(201).json({ data: result, message: "Created Successfully!" });
                    })
                    .catch((error: Error) => {
                        response.status(error.statusCode).json({ error: error.errorCode, message: error.message });
                    });
            }

        } catch (error) {
            response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
        }

    }
    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id);
        RoleService.findById(id)
            .then((result: Role) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        RoleService.findOne(query)
            .then((result: Role) => {
                response.status(200).json(result);
            }).catch((error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        RoleService.findAll(query)
            .then((result: Role[]) => {
                response.status(200).json(result)
            })
            .catch((error: Error) => {
                response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message });
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
        RoleService.update(id, payload)
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
        RoleService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default RoleController;
