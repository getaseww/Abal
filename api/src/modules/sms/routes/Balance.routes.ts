import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { BalanceController } from "../controllers";

let router: Router = express.Router();

router.post("/", BalanceController.create)
    .get("/", BalanceController.findAll)
    
    .get("/one", BalanceController.findOne)

    .get("/:id", BalanceController.findById)

    .put("/:id", BalanceController.update)

    .delete("/:id", BalanceController.remove)


export default router;