import express, { Router } from "express";
import RoleController from "../controllers/Role.controller";

let router: Router = express.Router();

router.post("/", RoleController.create)
    .get("/", RoleController.findAll)

    .get("/:id", RoleController.findById)

    .put("/", RoleController.update)

    .delete("/:id", RoleController.remove)


export default router;