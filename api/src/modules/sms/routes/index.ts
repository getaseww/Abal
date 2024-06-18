import BalanceRoutes from './Balance.routes'
import PackageRoutes from './Package.routes'
import SubscriptionRoutes from './Subscription.routes'
import ContentRoutes from './Content.routes'
import { Application } from 'express'
import { authenticateHeader } from '../../../middlewares/authentication.middleware'


export const SMSRoutes = (app: Application) => {
    app.use("/api/sms/package", authenticateHeader, PackageRoutes);
    app.use("/api/sms/subscription", authenticateHeader, SubscriptionRoutes);
    app.use("/api/sms/content", authenticateHeader, ContentRoutes);
    app.use("/api/sms/balance", authenticateHeader, BalanceRoutes);

}

