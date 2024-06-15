import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { PackageController } from "../controllers";

let router: Router = express.Router();

router.post("/",authenticateHeader,PackageController.create)
    .get("/", PackageController.findAll)

    .get("/:id", PackageController.findById)

    .put("/:id", PackageController.update)

    .delete("/:id", PackageController.remove)


export default router;