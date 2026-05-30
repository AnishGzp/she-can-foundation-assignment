import { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
  },
  { timestamps: true },
);

export const contactModel = model("Contact", ContactSchema);
