import EquipmentRoutes from './Equipment.routes'
import EquipmentCategoryRoutes from './EquipmentCategory.routes'
import LocationRoutes from './Location.routes'
import { Application } from 'express'
import { authenticateHeader } from '../../../middlewares/authentication.middleware'


export const InventoryRoutes = (app: Application) => {
    app.use("/api/inventory/equipment-category", authenticateHeader, EquipmentCategoryRoutes);
    app.use("/api/inventory/equipment", authenticateHeader, EquipmentRoutes);
    app.use("/api/inventory/location", authenticateHeader, LocationRoutes);

}

