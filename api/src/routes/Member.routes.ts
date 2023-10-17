import express, { Router } from "express";
import MemberController from "../controllers/Member.controller";
import {authenticateHeader} from '../middlewares/authentication.middleware';

let router: Router = express.Router();

router.post("/", authenticateHeader, MemberController.create)
.get("/",  MemberController.findAll)

.get("/:id",  MemberController.findById)

.put("/:id",  MemberController.update)

.delete("/:id",  MemberController.remove)


export default router;