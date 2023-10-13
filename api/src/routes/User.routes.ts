import express, { Router } from "express";
import UserController from "../controllers/User.controller";
import { generateToken, authentication, response } from '../middlewares/authentication.middleware';

let router: Router = express.Router();

router.post("/register", UserController.create, generateToken, response)
    .post("/login", authentication, generateToken, response)
    .get("/", UserController.findAll)

    .get("/:id", UserController.findById)

    .put("/", UserController.update)

    .delete("/:id", UserController.remove)


export default router;