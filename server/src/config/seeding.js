import { ROLES } from "../constants/role.constant.js";
import { userModel } from "../models/user.model.js";

export async function adminSeeder() {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASS;

    if (!email || !password) {
      throw new Error("Admin credentials are not found in .env\n");
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const user = new userModel({
      name: "Admin",
      email,
      password,
      role: ROLES.ADMIN,
    });

    await user.save();
    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Admin seeding error\n", error);
  }
}
