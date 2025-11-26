import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";

// --- Get current logged-in user profile
export const getMe = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await userModel
      .findById(userId)
      .select("-password -resetPasswordToken -resetPasswordExpires");
    if (!user) return res.status(404).json({ message: "User not found" });

    const roleFolder = user.role === "student" ? "students" : "managers";
    const profileImg = `${process.env.APP_URL}/uploads/${roleFolder}/${user.photo}`;

    return res.json({
      message: "OK",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: profileImg,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// --- Update name & email
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { name, email } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      // optional: check uniqueness
      const existed = await userModel.findOne({ email });
      if (existed && existed._id.toString() !== userId) {
        return res.status(403).json({ message: "Email already in use" });
      }
      user.email = email;
    }

    if (name) user.name = name;

    await user.save();

    const roleFolder = user.role === "student" ? "students" : "managers";
    const profileImg = `${process.env.APP_URL}/uploads/${roleFolder}/${user.photo}`;

    return res.json({
      message: "Profile updated",
      data: {
        name: user.name,
        email: user.email,
        photo: profileImg,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// --- Update photo (expects req.file from uploadProfile)
export const updatePhoto = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) return res.status(401).json({ message: "No file uploaded" });

    // remove previous file (optional: only if not default)
    try {
      if (user.photo && user.photo !== "default.png") {
        const prevPath = path.join(
          "public",
          "uploads",
          user.role === "student" ? "students" : "managers",
          user.photo
        );
        if (fs.existsSync(prevPath)) fs.unlinkSync(prevPath);
      }
    } catch (e) {
      console.warn("Remove previous photo error: ", e.message);
    }

    user.photo = req.file.filename;
    await user.save();

    const roleFolder = user.role === "student" ? "students" : "managers";
    const profileImg = `${process.env.APP_URL}/uploads/${roleFolder}/${user.photo}`;

    return res.json({
      message: "Photo updated",
      data: {
        photo: profileImg,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// --- Change password
export const changePassword = async (req, res) => {
  try {
    const userId = req.user?._id;
    const { oldPassword, newPassword } = req.body;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    if (!oldPassword || !newPassword)
      return res.status(404).json({ message: "Invalid input" });

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = bcrypt.compareSync(oldPassword, user.password);
    if (!match)
      return res.status(401).json({ message: "Current password is incorrect" });

    const hashed = bcrypt.hashSync(newPassword, 12);
    user.password = hashed;
    await user.save();

    return res.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
