import { Request, Response } from "express";
import { z } from 'zod'
import { Op } from "sequelize";
import axios from "axios";
import logger from '../../../utils/loggers/winston'
import { Role } from "../../../enums";
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";
import { EquipmentCategoryService } from "../services";
import { EquipmentCategory } from "../models";


class EquipmentCategoryController {

    static create(request: Request, response: Response) {
        const schema = z.object({
        })

        const data = request.body;
        const user: any = request.user;

        try {
            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Faile to create Equipment Category 400: ${schemaResult.error}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                EquipmentCategoryService.create({ ...data, user_id: user.id })
                    .then((result: EquipmentCategory) => {
                        response.status(200).json({ status: "success", data: result, message: "created successfully!" });
                    })
                    .catch((error: Error) => {
                        logger.error(`Faile to create Equipment Category: ${JSON.parse(schemaResult.error)}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create" });
                    });
            }
        } catch (error) {
            response.status(500).json({ status: "failed", error, message: "Failed to create Equipment Category!" });
        }
    }



    static findById(request: Request, response: Response) {
        let id = parseInt(request.params.id)
        EquipmentCategoryService.findById(id)
            .then((result: EquipmentCategory) => {
                response.status(200).json({ status: "success", data: result, message: "Equipment Category fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch Equipment Category data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        const user: any = request.user

        if (user.role == Role.OWNER)
            query = {
                ...query, user_id: user.id
            }

        EquipmentCategoryService.findOne(query)
            .then((result: EquipmentCategory) => {
                response.status(200).json({ status: "success", data: result, message: "Equipment Category fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch Equipment Category data!", error });
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
        EquipmentCategoryService.findAll(query)
            .then((result: EquipmentCategory) => {
                response.status(200).json({ status: "success", data: result, message: "Equipment Category fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch EquipmentCategory data!", error });
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
            EquipmentCategoryService.update(id, payload)
                .then((result) => {
                    if (result) {
                        response.status(200).json({ status: "success", data: result, message: "Equipment Category updated successfully!" })
                    } else {
                        response.status(ErrorStatusNumber.notFoundError).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                    }
                }).catch((error) => {
                    response.status(500).json({ status: "failed", error, message: "Failed to update Equipment Category!" });
                })
        }

    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        EquipmentCategoryService.remove(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "EquipmentCategory deleted successfully!" })
            })
            .catch((error) => response.status(500).json({ status: "failed", error, message: "Failed to delete EquipmentCategory!" }))
    }
}

export default EquipmentCategoryController;
