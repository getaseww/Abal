import { Request, Response } from "express";
import { z } from 'zod'
import { Op } from "sequelize";
import axios from "axios";
import logger from '../../../utils/loggers/winston'
import { BalanceService } from "../services";
import { Balance } from "../models";
import { Role } from "../../../enums";
import { ErrorMessages, ErrorStatusNumber } from "../../../errors/errors";


class BalanceController {

    static create(request: Request, response: Response) {
        const schema = z.object({
            balance: z.number(),
        })

        const data = request.body;
        const user: any = request.user;

        try {
            const schemaResult: any = schema.safeParse(data)
            if (!schemaResult.success) {
                logger.error(`Faile to create Balance: ${JSON.parse(schemaResult.error)}`);
                response.status(ErrorStatusNumber.badRequestError).json({ status: "failed", error: schemaResult.error, message: ErrorMessages.badRequestError });
            } else {
                BalanceService.create({ ...data, user_id: user.id })
                    .then((result: Balance) => {
                        response.status(200).json({ status: "success", data: result, message: "Sale created successfully!" });
                    })
                    .catch((error: Error) => {
                        logger.error(`Faile to create Balance: ${JSON.parse(schemaResult.error)}`);
                        response.status(500).json({ status: "failed", error: error, message: "Failed to create Balance" });
                    });
            }
        } catch (error) {
            response.status(500).json({ status: "failed", error, message: "Failed to create Balance!" });
        }
    }



    static findById(request: Request, response: Response) {
        let id = request.params.id
        BalanceService.findById(id)
            .then((result: Balance) => {
                response.status(200).json({ status: "success", data: result, message: "Balance fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch balance data!", error });
            })
    }

    static findOne(request: Request, response: Response) {
        let query = {}
        const user: any = request.user

        // if (user.role != Role.ADMIN)
        //     query = {
        //         ...query, user_id: user.id
        //     }

        BalanceService.findOne(query)
            .then((result: Balance) => {
                response.status(200).json({ status: "success", data: result, message: "Balance fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch balance data!", error });
            })
    }

    static findAll(request: Request, response: Response) {
        let query = {}
        const user: any = request.user
        console.log("user data",user)

       
        if (request.query.user_id && request.query.user_id != "undefined") {
            query = {
                ...query, user_id: request.query.user_id
                }
            }
         else if (user.role != Role.ADMIN) {
            query = {
                ...query,
                user_id: user.id
            }
        }
        BalanceService.findAll(query)
            .then((result: Balance) => {
                response.status(200).json({ status: "success", data: result, message: "Balance fetched successfully!" })
            }).catch((error) => {
                response.status(500).json({ status: "failed", message: "Failed to fetch balance data!", error });
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
            BalanceService.update(id, payload)
                .then((result) => {
                    if (result) {
                        response.status(200).json({ status: "success", data: result, message: "Balance updated successfully!" })
                    } else {
                        response.status(ErrorStatusNumber.notFoundError).json({ status: "failed", data: null, message: ErrorMessages.notFoundError })
                    }
                }).catch((error) => {
                    response.status(500).json({ status: "failed", error, message: "Failed to update balance!" });
                })
        }

    }


    static remove(request: Request, response: Response) {
        let id = request.params.id;
        BalanceService.remove(id)
            .then((result) => {
                response.status(200).json({ status: "success", data: result, message: "Balance deleted successfully!" })
            })
            .catch((error) => response.status(500).json({ status: "failed", error, message: "Failed to delete balance!" }))
    }
}

export default BalanceController;
