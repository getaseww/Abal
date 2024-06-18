import { Application } from "express";
import UserRoutes from "./User.routes";
import MembershipPlanRoutes from './MembershipPlan.routes';
import SubscriptionRoutes from './Subscription.routes';
import PaymentRoutes from './Payment.routes';
import RoleRoutes from "./Role.routes";
import ProfileRoutes from './Profile.routes';


import { authenticateHeader } from "../middlewares/authentication.middleware";
import { SMSRoutes } from "../modules/sms/routes";
import { InventoryRoutes } from "../modules/Inventory/routes";
const routes = (app: Application) => {
    SMSRoutes(app);
    InventoryRoutes(app);
    app.use("/api/user", UserRoutes);
    app.use("/api/role", RoleRoutes);
    app.use("/api/membership-plan", authenticateHeader, MembershipPlanRoutes);
    app.use("/api/subscription", authenticateHeader, SubscriptionRoutes);
    app.use("/api/payment", authenticateHeader, PaymentRoutes);
    app.use("/api/profile", authenticateHeader, ProfileRoutes);
}

export default routes;