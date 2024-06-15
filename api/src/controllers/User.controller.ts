import { Request, Response } from "express";
import UserService from "../services/User.service";
import { User, Error } from "../types";
import { BadRequestError, ErrorMessages } from "../errors/errors";
import { z } from 'zod'
import { Role } from "../enums";

class UserController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            first_name: z.string(),
            last_name: z.string(),
            phone_number: z.string().regex(new RegExp(/^09\d{8}$/), "Invalid phone number use 09 format!"),
            password: z.string().optional(),
        })

        try {
            const data = request.body;
            const user: any = request.user;
            data.user_id = user?.id ?? null

            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(400).json(schemaResult);
            } else {
                UserService.create(data)
                    .then((result: User) => {
                        const { password, ...data } = result;
                        response.status(200).json(data);
                    })
                    .catch((error: Error) => {

                        response.status(401).json(error);
                    });
            }

        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));
            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });
        }

    }

    static createMember(request: Request, response: Response) {

        console.log("user data", request.body)
        const schema = z.object({
            user: z.object({
                first_name: z.string(),
                last_name: z.string(),
                phone_number: z.string().regex(new RegExp(/^09\d{8}$/), "Invalid phone number use 09 format!"),
                password: z.string().optional(),
            }),
            profile: z.object({
                sex: z.string(),
                address: z.string().optional(),
            })
        })

        try {
            const data = request.body;
            const user: any = request.user;
            data.user.user_id = user?.id ?? null
            data.user.role_id = 2

            const schemaResult = schema.safeParse(data)
            if (!schemaResult.success) {
                response.status(400).json({ status: "failed", data: null, error: ErrorMessages.badRequestError, message: "failed to create!" })
            } else {
                UserService.createMember(data)
                    .then((result: User) => {
                        const { password, ...data } = result;
                        response.status(200).json({ status: "success", data, message: "fetched successfully!" })
                    })
                    .catch((error: Error) => {
                        response.status(500).json({ status: "failed", message: "Failed to create data!", error });
                    });
            }

        } catch (error) {
            let err = new BadRequestError(JSON.stringify(error));
            response.status(error.statusCode).json({ "error": err.errorCode, "message": err.message });
        }

    }

    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id)
        UserService.findById(id)
            .then((result: User) => {
                const { password, ...data } = result;
                response.status(200).json({ status: "success", data, message: "fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.name && request.query.name != "undefined")
            query = { ...query, name: request.query.name }

        UserService.findOne(query)
            .then((result: User) => {
                const { password, ...data } = result;
                response.status(200).json({ status: "success", data, message: "fetched successfully!" })
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

        UserService.findAll(query)
            .then((result: User[]) => {
                const data = result.map(({ password, ...rest }) => rest);
                response.status(200).json({ status: "success", data, message: "fetched successfully!" })
            })
            .catch((error: Error) => {
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
        UserService.update(id, payload)
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
        UserService.remove(id)
            .then((result) => { response.status(200).json(result) })
            .catch((error) => response.status(error.statusCode).json({ "error": error.errorCode, "message": error.message }))
    }
}

export default UserController;
