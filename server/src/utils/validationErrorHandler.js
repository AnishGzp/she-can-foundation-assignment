import { validationResult } from "express-validator";
import { AppError } from "./handleError.js";

export const validationErrorHandle = (req) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    throw new AppError(400, "Validation Error", validationErrors.array());
  }
};
