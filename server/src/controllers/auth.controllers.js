import { authServices } from "../services/auth.services.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { validationErrorHandle } from "../utils/validationErrorHandler.js";

export class AuthController {
  async login(req, res, next) {
    try {
      validationErrorHandle(req);

      const inputData = req.body;
      const data = await authServices.login(inputData);

      res.cookie("token", data, {
        httpOny: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      sendSuccess(res, "Login successfull");
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
