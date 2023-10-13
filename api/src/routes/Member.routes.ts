import express, { Router } from "express";
import MemberController from "../controllers/Member.controller";

let router: Router = express.Router();

router.post("/",  MemberController.create)
.get("/",  MemberController.findAll)

.get("/:id",  MemberController.findById)

.put("/",  MemberController.update)

.delete("/:id",  MemberController.remove)


export default router;