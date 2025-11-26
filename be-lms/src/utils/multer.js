import multer from "multer";
import fs from "fs";
import path from "path";

export const fileStorageCourse = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/courses");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1];
    const uniqId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqId}.${ext}`);
  },
});

export const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const fileStorage = (folderName = "courses") =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join("public", "uploads", folderName);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".")[1];
      const uniqId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${file.fieldname}-${uniqId}.${ext}`);
    },
  });
