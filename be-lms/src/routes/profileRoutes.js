import express from "express";
import {
  getMe,
  updateProfile,
  updatePhoto,
  changePassword,
} from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadProfile } from "../middlewares/uploadProfile.js";

const profileRoutes = express.Router();

profileRoutes.get("/me", verifyToken, getMe);
profileRoutes.put("/update-profile", verifyToken, updateProfile);
profileRoutes.put("/change-password", verifyToken, changePassword);

profileRoutes.put(
  "/update-photo",
  verifyToken,
  (req, res, next) => uploadProfile(req.user.role)(req, res, next),
  updatePhoto
);

export default profileRoutes;
