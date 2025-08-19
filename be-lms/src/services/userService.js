import userModel from "../models/userModel.js";

export const isEmailUnique = async (email) => {
  try {
    const existingUser = await userModel.findOne({ email: email });
    return !existingUser; // Mengembalikan true jika tidak ditemukan (unik), false jika ditemukan
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    // Dalam kasus error database, anggap saja tidak unik untuk keamanan atau tangani sesuai kebijakan Anda
    // Atau bisa juga melemparkan error agar ditangkap oleh error handling middleware
    throw new Error("Database error during email uniqueness check");
  }
};
