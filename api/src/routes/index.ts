import { Application } from "express";
import UserRoutes from "./User.routes";
import MembershipPlanRoutes from './MembershipPlan.routes';
import SubscriptionRoutes from './Subscription.routes';
import PaymentRoutes from './Payment.routes';
import MemberRoutes from './Member.routes';



const routes=(app:Application)=>{
    app.use("/api/user",UserRoutes),
    app.use("/api/membership-plan",MembershipPlanRoutes) 
    app.use("/api/subscription",SubscriptionRoutes) 
    app.use("/api/payment",PaymentRoutes) 
    app.use("/api/member",MemberRoutes) 
}

export default routes;