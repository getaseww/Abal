import express, { Router } from "express";
import { generateToken, authentication, response, authenticateHeader } from '../../../middlewares/authentication.middleware';
import { ContentController } from "../controllers";

let router: Router = express.Router();

router.post("/", authenticateHeader, ContentController.create)

    .post("/send-bulk-sms", authenticateHeader, ContentController.send)
    .post("/save-and-send-notification", authenticateHeader, ContentController.saveAndSend)
    .get("/", authenticateHeader, ContentController.findAll)

    .get("/:id",authenticateHeader, ContentController.findById)

    .put("/:id", authenticateHeader, ContentController.update)

    .put("/send-bulk-sms/:id", authenticateHeader, ContentController.send)

    .delete("/:id", authenticateHeader,ContentController.remove)


export default router;