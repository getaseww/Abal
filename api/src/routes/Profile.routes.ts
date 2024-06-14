import express, { Router } from "express";
import ProfileController from "../controllers/Profile.controller";

let router: Router = express.Router();

router.post("/", ProfileController.create)
    .get("/", ProfileController.findAll)

    .get("/:id", ProfileController.findById)

    .put("/", ProfileController.update)

    .delete("/:id", ProfileController.remove)


export default router;