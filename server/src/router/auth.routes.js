import express from "express";
import { loginValidation } from "../validators/auth.validators.js";
import { authController } from "../controllers/auth.controllers.js";

const authRoutes = express.Router();

authRoutes.post("/", loginValidation, authController.login);

export default authRoutes;
