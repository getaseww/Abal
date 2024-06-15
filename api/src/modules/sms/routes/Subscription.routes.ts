import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { SubscriptionController } from "../controllers";

let router: Router = express.Router();

router.post("/", authenticateHeader, SubscriptionController.create)
    .get("/", authenticateHeader, SubscriptionController.findAll)

    .get("/:id", authenticateHeader, SubscriptionController.findById)

    .put("/:id", authenticateHeader, SubscriptionController.update)

    .delete("/:id", authenticateHeader, SubscriptionController.remove)


export default router;