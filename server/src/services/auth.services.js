import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { AppError } from "../utils/handleError.js";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secret-key";

export class AuthServices {
  async login(inputData) {
    try {
      const user = await userModel
        .findOne({ email: inputData.email })
        .select("+password");
      if (!user) {
        throw new AppError(401, "Invalid credentials");
      }

      const isMatch = await user.comparePassword(inputData.password);
      if (!isMatch) {
        throw new AppError(401, "Invalid credentials");
      }

      const tokenPayload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };

      const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "7d" });

      return token;
    } catch (error) {
      throw error;
    }
  }
}

export const authServices = new AuthServices();
