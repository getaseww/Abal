import express, { Router } from "express";
import { LocationController } from "../controllers";

let router: Router = express.Router();

router.post("/", LocationController.create)
    .get("/", LocationController.findAll)

    .get("/:id", LocationController.findById)

    .put("/:id", LocationController.update)

    .delete("/:id", LocationController.remove)


export default router;