import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { EquipmentCategoryController } from "../controllers";

let router: Router = express.Router();

router.post("/", authenticateHeader, EquipmentCategoryController.create)

    .get("/", authenticateHeader, EquipmentCategoryController.findAll)

    .get("/:id",authenticateHeader, EquipmentCategoryController.findById)

    .put("/:id", authenticateHeader, EquipmentCategoryController.update)

    .delete("/:id", authenticateHeader,EquipmentCategoryController.remove)


export default router;