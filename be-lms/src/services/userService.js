import userModel from "../models/userModel.js";

export const isEmailUnique = async (email) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    return !existingUser;
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    throw new Error("Database error during email uniqueness check");
  }
};
