import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { contactValidator } from "../validators/contact.validators.js";
import { contactController } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.post("/", contactValidator, contactController.create);
contactRouter.use(authenticate);
contactRouter.get("/", contactController.get);
contactRouter.delete("/:id", contactController.delete);

export default contactRouter;
