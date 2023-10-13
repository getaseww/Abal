import express, { Router } from "express";
import MembershipPlanController from "../controllers/MembershipPlan.controller";

let router: Router = express.Router();

router.post("/",  MembershipPlanController.create)
.get("/",  MembershipPlanController.findAll)

.get("/:id",  MembershipPlanController.findById)

.put("/",  MembershipPlanController.update)

.delete("/:id",  MembershipPlanController.remove)


export default router;