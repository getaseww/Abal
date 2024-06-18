import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { EquipmentController } from "../controllers";

let router: Router = express.Router();

router.post("/", EquipmentController.create)
    .get("/", EquipmentController.findAll)
    
    .get("/one", EquipmentController.findOne)

    .get("/:id", EquipmentController.findById)

    .put("/:id", EquipmentController.update)

    .delete("/:id", EquipmentController.remove)


export default router;