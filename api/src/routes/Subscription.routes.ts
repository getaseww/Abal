import express, { Router } from "express";
import SubscriptionController from "../controllers/Subscription.controller";

let router: Router = express.Router();

router.post("/",  SubscriptionController.create)
.get("/",  SubscriptionController.findAll)

.get("/:id",  SubscriptionController.findById)

.put("/",  SubscriptionController.update)

.delete("/:id",  SubscriptionController.remove)


export default router;