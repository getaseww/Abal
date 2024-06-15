// import { Request, Response } from "express";
// import {Error } from "../../types";
// import { BadRequestError } from "../../errors/errors";
// import { z } from 'zod'
// import NotificationService from "../services/notification.service";
// import { Notification } from "../models/Notification";
// import { badRequestError, notFoundError } from "../../errors/customError";

// class NotificationController {

//     static create(request: Request, response: Response) {
        
//         const schema = z.object({
//             content_id: z.number(),
//             resident_id: z.number(),
//             mobile_number: z.string().min(10,"Please use perfect mobile number format!").max(10,"Please use perfect mobile number format!"),
//             is_sent: z.boolean().optional(),
//             sent_date: z.date().optional(),
//             reference_number: z.string().optional(),
//             user_id: z.number(),
//             modified_by: z.number().optional(),
//         })

//         const data = request.body;
//         try {
//             const schemaResult:any = schema.safeParse(data)
//             if (!schemaResult.success) {
//                 response.status(badRequestError.status).json({ status: "failed", data: null, message: badRequestError.message });
//             }
//             NotificationService.create(data)
//                 .then((result: Notification) => {
//                     response.status(200).json({ status: "success", data: result, message: "Notification created successfully!" });
//                 })
//                 .catch((error: Error) => {
//                     response.status(error?.status).json({ status: "failed", data: null, message: error.message });
//                 });
//         } catch (error) {
//             response.status(error.status).json({ status: "failed", data: null, message: error?.message });
//         }

//     }
//     static findById(request: Request, response: Response) {
//         let id = request.params.id
//         NotificationService.findById(id)
//             .then((result: Notification) => {
//                 response.status(200).json({ status: "success", data: result, message: "Notification fetched successfully!" })
//             }).catch((error) => {
//                 response.status(error.status).json({ status: "failed", message: error.message, data: null });
//             })
//     }

//     static findOne(request: Request, response: Response) {
//         let query = {}
//         if (request.query.name && request.query.name != "undefined")
//             query = { ...query, name: request.query.name }

//         NotificationService.findOne(query)
//             .then((result: Notification) => {
//                 response.status(200).json({ status: "success", data: result, message: "Notification fetched successfully!" })
//             }).catch((error) => {
//                 response.status(error.status).json({ status: "failed", message: error.message, data: null });
//             })
//     }

//     static findAll(request: Request, response: Response) {
//         let query = {}
//         if (request.query.name && request.query.name != "undefined")
//             query = { ...query, name: request.query.name }

//         NotificationService.findAll(query)
//             .then((result: Notification[]) => {
//                 response.status(200).json({ status: "success", data: result, message: "Notification fetched successfully!" })
//             })
//             .catch((error: Error) => {
//                 response.status(error.status).json({ status: "failed", message: error.message, data: null });
//             })
//     }

//     static update(request: Request, response: Response) {
//         let id:number = parseInt(request.params.id);
//         let payload = request.body;
//         const schema = z.object({
//             id: z.number(),
//         })
//         const result = schema.safeParse(id)
//         if (!result.success) {
//             response.status(badRequestError.status).json({ status: "failed", data: null, message: badRequestError.message });
//         }

//         NotificationService.update(id, payload)
//             .then((result) => {
//                 if (result) {
//                     response.status(200).json({ status: "success", data: result, message: "Notification updated successfully!" })
//                 } else {
//                     response.status(404).json({ status: "failed", data: null, message: notFoundError.message })
//                 }
//             }).catch((error) => {
//                 response.status(error.status).json({ status: "failed", message: error.message, data: null });
//             })
//         // } else {
//         // let error = Error.badRequestError(error?.details[0]?.message)
//         // res.status(error.status).json(error.message);
//         // }
//     }


//     static remove(request: Request, response: Response) {
//         let id = request.params.id;
//         NotificationService.remove(id)
//             .then((result) => { response.status(200).json({ status: "success", data: result, message: "Notification deleted successfully!" }) })
//             .catch((error) => response.status(error.status).json({ status: "failed", message: error.message, data: null }))
//     }
// }

// export default NotificationController;
