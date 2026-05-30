import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { contactValidator } from "../validators/contact.validators.js";
import { contactController } from "../controllers/contact.controller.js";

const contactRouter = express.Router();

contactRouter.use(authenticate);

contactRouter.post("/", contactValidator, contactController.create);
contactRouter.delete("/:id", contactController.delete);

export default contactRouter;
