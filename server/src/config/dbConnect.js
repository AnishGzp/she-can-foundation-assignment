import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("The MONGO_URI is not defined\n");
}

export const dbConnect = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      dbName: "she_can_foundation",
    });

    console.log("Database connection successfuly");
  } catch (error) {
    console.error("Database connection error\n", error);
    process.exit(1);
  }
};
