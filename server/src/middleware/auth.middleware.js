import jwt from "jsonwebtoken";
import { AppError } from "../utils/handleError.js";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secret-key";

export const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AppError(400, "Unauthorized Access");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
