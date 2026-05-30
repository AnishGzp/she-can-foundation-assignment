import { body } from "express-validator";

export const contactValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone()
    .withMessage("Valid phone number is required"),
  body("message").notEmpty().withMessage("Message is required"),
];
