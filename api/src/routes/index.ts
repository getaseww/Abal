import { Application } from "express";
import UserRoutes from "./User.routes";
import MembershipPlanRoutes from './MembershipPlan.routes'

const routes=(app:Application)=>{
    app.use("/api/v1/user",UserRoutes),
    app.use("/api/v1/membership-plan",MembershipPlanRoutes)
    
}

export default routes;