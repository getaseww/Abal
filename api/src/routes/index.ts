import { Application } from "express";
import UserRoutes from "./User.routes";
import MembershipPlanRoutes from './MembershipPlan.routes';
import SubscriptionRoutes from './Subscription.routes';
import PaymentRoutes from './Payment.routes';
import RoleRoutes from "./Role.routes";


const routes = (app: Application) => {
    app.use("/api/user", UserRoutes);
    app.use("/api/role", RoleRoutes);
    app.use("/api/membership-plan", MembershipPlanRoutes);
    app.use("/api/subscription", SubscriptionRoutes);
    app.use("/api/payment", PaymentRoutes);
}

export default routes;