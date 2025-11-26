import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import fs from "fs";
import {
  mutateStudentSchema,
  mutateUpdateStudentSchema,
} from "../utils/schema.js";
import path from "path";
import courseModel from "../models/courseModel.js";

export const getStudents = async (req, res) => {
  try {
    const students = await userModel
      .find({
        role: "student",
        manager: req.user._id,
      })
      .select("name courses photo email");

    const imageURL = process.env.APP_URL + "/uploads/students/";
    const response = students.map((item) => {
      return {
        ...item.toObject(),
        photo_url: imageURL + item.photo,
      };
    });

    return res.json({ message: "Get Student Success!", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await userModel.findById(id).select("name email");

    return res.json({
      message: "Get Detail Student Success!",
      data: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postStudent = async (req, res) => {
  try {
    const body = req.body;
    const parse = mutateStudentSchema.safeParse(body);

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
        return res.status(500).json({
          message: "Error Valdation",
          data: null,
          errors: errorMessages,
        });
      }
    }

    const hashPassword = bcrypt.hashSync(body.password, 12);

    const student = new userModel({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req.file?.filename,
      manager: req.user?._id,
      role: "student",
    });

    await student.save();

    return res.json({
      message: "Create Student Success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const cleanedBody = {
      ...body,
      password: body.password === "" ? undefined : body.password,
    };

    const parse = mutateUpdateStudentSchema.safeParse(cleanedBody);
    const dirname = path.resolve();

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);
      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }
      return res.status(400).json({
        message: "Error Validation",
        data: null,
        errors: errorMessages,
      });
    }

    const student = await userModel.findById(id);
    if (!student) {
      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }
      return res.status(404).json({
        message: "Student not found",
      });
    }

    const imageURL = "public/uploads/students/";

    let hashPassword;
    if (
      parse.data.password !== undefined &&
      parse.data.password !== null &&
      parse.data.password.trim() !== ""
    ) {
      hashPassword = bcrypt.hashSync(parse.data.password, 12);
      console.log("Password will be updated with new hash");
    } else {
      hashPassword = student.password;
      console.log("Password will remain unchanged");
    }

    console.log("Original password from body:", body.password);
    console.log("Cleaned password:", cleanedBody.password);
    console.log("Parsed password:", parse.data.password);
    console.log(
      "Will update password:",
      parse.data.password !== undefined &&
        parse.data.password !== null &&
        parse.data.password.trim() !== ""
    );

    if (req.file && student.photo) {
      const oldStudentPhoto = path.join(dirname, imageURL, student.photo);
      if (fs.existsSync(oldStudentPhoto)) {
        fs.unlinkSync(oldStudentPhoto);
      }
    }

    await userModel.findByIdAndUpdate(id, {
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      photo: req?.file ? req.file?.filename : student.photo,
    });

    return res.json({
      message: "Update Student Success",
    });
  } catch (error) {
    console.log(error);
    if (req?.file?.path && fs.existsSync(req?.file?.path)) {
      fs.unlinkSync(req?.file?.path);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await userModel.findById(id);
    await courseModel.findOneAndUpdate(
      {
        students: id,
      },
      {
        $pull: {
          students: id,
        },
      }
    );

    const dirname = path.resolve();
    const filePath = path.join(
      dirname,
      "public/uploads/students",
      student.photo
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await userModel.findByIdAndDelete(id);

    return res.json({ message: "Delete Student Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentCourses = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate({
      path: "courses",
      select: "name category thumbnail",
      populate: {
        path: "category",
        select: "name",
      },
    });

    const imageUrl = process.env.APP_URL + "/uploads/courses/";
    const response = user?.courses?.map((item) => {
      return {
        ...item.toObject(),
        thumbnail_url: imageUrl + item.thumbnail,
      };
    });

    return res.json({
      message: "Get Student Course List success!",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
