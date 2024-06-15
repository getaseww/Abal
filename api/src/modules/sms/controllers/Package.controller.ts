import { Request, Response } from "express";
import { Package } from "../models/Package";
import { z } from 'zod'
import { Op } from "sequelize";
import logger from '../../../utils/loggers/winston'
import { PackageService } from "../services";
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";


class PackageController {

    static create(request: Request, response: Response) {

        const schema = z.object({
            name: z.string(),
            description: z.string().optional(),
            quantity: z.number(),
            price: z.number(),
            modified_by: z.number().optional(),
        })



        try {
            const data = request.body;
            const user: any = request.user;
            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Failed to create package: ${JSON.parse(schemaResult.error)}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                PackageService.create({ ...data, user_id: user.id })
                    .then((result: Package) => {
                        response.status(200).json({ status: "success", data: result, message: "Package created successfully!" });
                    })
                    .catch((error) => {
                        logger.error(`Failed to create sms package: ${error}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create sms package" });
                    });
            }
        } catch (error) {
            logger.error(`Failed to create sms package: ${error}`);
            response.status(500).json({ status: "failed", error: error, message: "Failed to create sms package" });
        }

    }
    static findById(request: Request, response: Response) {
        let id = request.params.id
        PackageService.findById(id)
            .then((result: Package) => {
                response.status(200).json({ status: "success", data: result, message: "Package fetched successfully!" })
            }).catch((error) => {
                logger.error(`Failed to fetch sms package: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to find sms package" });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        if (request.query.title && request.query.title != "undefined")
            query = { ...query, title: request.query.title }

        PackageService.findOne(query)
            .then((result: Package) => {
                response.status(200).json({ status: "success", data: result, message: "Package fetched successfully!" })
            }).catch((error) => {
                logger.error(`Failed to fetch sms package: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to fetch sms package" });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        const user: any = request.user
        if (request.query.name && request.query.name != "undefined") {
            query = {
                ...query, name: {
                    [Op.like]: `%${request.query.name}%`
                }
            }
        }


        PackageService.findAll(query)
            .then((result: Package[]) => {
                response.status(200).json({ status: "success", data: result, message: "Package fetched successfully!" })
            })
            .catch((error: Error) => {
                logger.error(`Failed to fetch sms package: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to fetch sms package" });
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
            logger.error(`Failed to update package: ${JSON.parse(result.error)}`);
            response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: result.error, message: ErrorMessages.badRequestError });
        } else {
            PackageService.update(id, payload)
                .then((result) => {
                    if (result) {
                        response.status(200).json({ status: "success", data: result, message: "Package updated successfully!" })
                    } else {
                        response.status(404).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                    }
                }).catch((error) => {
                    logger.error(`Failed to update sms package: ${error}`);
                    response.status(500).json({ status: "failed", error: error, message: "Failed to update sms package" });
                })
        }
    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        PackageService.remove(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "Package deleted successfully!" })
            })
            .catch((error) => {
                logger.error(`Failed to delete sms package: ${error}`);
                response.status(500).json({ status: "failed", error: error, message: "Failed to delete sms package" });
            })
    }
}

export default PackageController;
