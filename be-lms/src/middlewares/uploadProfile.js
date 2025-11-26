import multer from "multer";
import { fileFilter, fileStorage } from "../utils/multer.js";

export const uploadProfile = (role = "manager") => {
  const folder = role === "student" ? "students" : "managers";
  return multer({
    storage: fileStorage(folder),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("photo");
};
