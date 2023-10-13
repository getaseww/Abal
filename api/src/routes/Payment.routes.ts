import express, { Router } from "express";
import PaymentController from "../controllers/Payment.controller";

let router: Router = express.Router();

router.post("/",  PaymentController.create)
.get("/",  PaymentController.findAll)

.get("/:id",  PaymentController.findById)

.put("/",  PaymentController.update)

.delete("/:id",  PaymentController.remove)


export default router;