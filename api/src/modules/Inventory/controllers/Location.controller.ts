import { Request, Response } from "express";
import { z } from 'zod'
import { Op } from "sequelize";
import axios from "axios";
import logger from '../../../utils/loggers/winston'
import { Role } from "../../../enums";
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";
import { LocationService } from "../services";
import { Location } from "../models";


class LocationController {

    static create(request: Request, response: Response) {
        const schema = z.object({
        })

        const data = request.body;
        const user: any = request.user;

        try {
            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Faile to create Location 400: ${schemaResult.error}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                LocationService.create({ ...data, user_id: user.id })
                    .then((result: Location) => {
                        response.status(200).json({ status: "success", data: result, message: "created successfully!" });
                    })
                    .catch((error: Error) => {
                        logger.error(`Faile to create Location: ${JSON.parse(schemaResult.error)}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create" });
                    });
            }
        } catch (error) {
            response.status(500).json({ status: "failed", error, message: "Failed to create Location!" });
        }
    }



    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id)
        LocationService.findById(id)
            .then((result: Location) => {
                response.status(200).json({ status: "success", data: result, message: "Location fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch Location data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        const user: any = request.user

        if (user.role == Role.OWNER)
            query = {
                ...query, user_id: user.id
            }

        LocationService.findOne(query)
            .then((result: Location) => {
                response.status(200).json({ status: "success", data: result, message: "Location fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch Location data!", error });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        const user: any = request.user


        if (request.query.user_id && request.query.user_id != "undefined") {
            query = {
                ...query, user_id: request.query.user_id
            }
        }
        else if (user.role == Role.OWNER)
            query = {
                ...query, user_id: user.id
            }
        LocationService.findAll(query)
            .then((result: Location) => {
                response.status(200).json({ status: "success", data: result, message: "Location fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch Location data!", error });
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
            response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: result.error, message: ErrorMessages.badRequestError });
        } else {
            LocationService.update(id, payload)
                .then((result) => {
                    if (result) {
                        response.status(200).json({ status: "success", data: result, message: "Location updated successfully!" })
                    } else {
                        response.status(ErrorStatusNumber.notFoundError).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                    }
                }).catch((error) => {
                    response.status(500).json({ status: "failed", error, message: "Failed to update Location!" });
                })
        }

    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        LocationService.remove(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "Location deleted successfully!" })
            })
            .catch((error) => response.status(500).json({ status: "failed", error, message: "Failed to delete Location!" }))
    }
}

export default LocationController;
