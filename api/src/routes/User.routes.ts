import express, { Router } from "express";
import UserController from "../controllers/User.controller";
import { generateToken, authentication, response, authenticateHeader } from '../middlewares/authentication.middleware';

let router: Router = express.Router();

router.post("/register", UserController.create, generateToken, response)
    .post("/create", authenticateHeader, UserController.create, generateToken, response)
    .post("/member/create", authenticateHeader, UserController.createMember, generateToken, response)
    .post("/login", authentication, generateToken, response)
    .get("/",authenticateHeader, UserController.findAll)

    .get("/:id", authenticateHeader,UserController.findById)

    .put("/:id", authenticateHeader,UserController.update)

    .delete("/:id", authenticateHeader,UserController.remove)


export default router;