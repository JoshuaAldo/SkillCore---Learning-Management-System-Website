import courseModel from "../models/courseModel.js";
import { mutateCourseSchema } from "../utils/schema.js";
import fs from "fs";
import categoryModel from "../models/categoriesModel.js";
import userModel from "../models/userModel.js";
import path from "path";
import courseDetailModel from "../models/courseDetailModel.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find({
        manager: req.user?._id,
      })
      .select("name thumbnail")
      .populate({
        path: "category",
        select: "name -_id",
      })
      .populate({
        path: "students",
        select: "name",
      });

    const imageURL = process.env.APP_URL + "/uploads/courses/";
    const response = courses.map((item) => {
      return {
        ...item.toObject(),
        thumbnail_url: imageURL + item.thumbnail,
        total_students: item.students.length,
      };
    });
    return res.json({
      message: "Get Course Success",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    return res.json({
      message: "Get categories success",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await categoryModel.findById(id);

    return res.json({
      message: "Get Categories Detail success",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postCategories = async (req, res) => {
  try {
    const { name } = req.body;
    let category = await categoryModel.findOne({ name: name });

    if (!name) {
      return res.status(404).json({
        message: "Category name is required",
      });
    }

    if (category) {
      return res.status(404).json({
        message: "Category name already exists",
      });
    }

    const newCategory = new categoryModel({
      name,
    });

    // Simpan ke database
    await newCategory.save();

    return res.json({ message: "Category created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCategories = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, courses } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, {
      name,
      courses,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};

export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await categoryModel
      .findById(id)
      .populate("courses");
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (deletedCategory.courses.length > 0) {
      return res.status(499).json({
        message: `Category "${deletedCategory.name}" cannot be deleted because it still has ${deletedCategory.courses.length} course(s).`,
      });
    }

    await categoryModel.findByIdAndDelete(id);

    return res.json({
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const { preview } = req.query;
    const course = await courseModel
      .findById(id)
      .populate({
        path: "category",
        select: "name _id",
      })
      .populate({
        path: "details",
        select: preview === "true" ? "title type youtubeId text" : "title type",
      });

    const imageURL = process.env.APP_URL + "/uploads/courses/";

    return res.json({
      message: "Get Course Detail success",
      data: {
        ...course.toObject(),
        thumbnail_url: imageURL + course.thumbnail,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postCourse = async (req, res) => {
  try {
    const body = req.body;
    const parse = mutateCourseSchema.safeParse(body);

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

    const category = await categoryModel.findById(parse.data.categoryId);

    if (!category) {
      return res.status(404).json({
        message: "Category Id not found",
      });
    }

    const course = new courseModel({
      name: parse.data.name,
      category: category._id,
      description: parse.data.description,
      tagline: parse.data.tagline,
      thumbnail: req.file?.filename,
      manager: req.user._id,
    });

    await course.save();

    await categoryModel.findByIdAndUpdate(
      category._id,
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      req.user?._id,
      {
        $push: {
          courses: course._id,
        },
      },
      { new: true }
    );

    return res.json({ message: "Course created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const body = req.body;
    const courseId = req.params.id;
    const parse = mutateCourseSchema.safeParse(body);
    const dirname = path.resolve();

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

    const category = await categoryModel.findById(parse.data.categoryId);
    const oldCourse = await courseModel.findById(courseId);
    const imageURL = "public/uploads/courses/";
    if (!oldCourse) {
      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }
      return res.status(404).json({
        message: "Course not found",
      });
    }

    if (!category) {
      if (req?.file?.path && fs.existsSync(req?.file?.path)) {
        fs.unlinkSync(req?.file?.path);
      }
      return res.status(404).json({
        message: "Category Id not found",
      });
    }

    if (req.file && oldCourse.thumbnail) {
      const oldThumbnailPath = path.join(
        dirname,
        imageURL,
        oldCourse.thumbnail
      );
      fs.unlinkSync(oldThumbnailPath);
    }

    await courseModel.findByIdAndUpdate(courseId, {
      name: parse.data.name,
      category: category._id,
      description: parse.data.description,
      tagline: parse.data.tagline,
      thumbnail: req?.file ? req.file?.filename : oldCourse.thumbnail,
      manager: req.user._id,
    });

    if (oldCourse.category.toString() !== category._id.toString()) {
      await categoryModel.findByIdAndUpdate(oldCourse.category, {
        $pull: { courses: oldCourse._id },
      });
      await categoryModel.findByIdAndUpdate(category._id, {
        $addToSet: { courses: oldCourse._id },
      });
    }

    return res.json({ message: "Updated Course successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id);

    if (course.details.length > 0) {
      return res.status(403).json({
        message: `Course "${course.name}" cannot be deleted because it still has ${course.details.length} content(s).`,
      });
    }

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const dirname = path.resolve();
    const filePath = path.join(
      dirname,
      "public/uploads/courses",
      course.thumbnail
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (course.category) {
      await categoryModel.findByIdAndUpdate(course.category, {
        $pull: { courses: course._id },
      });
    }

    if (course.manager) {
      await userModel.findByIdAndUpdate(course.manager, {
        $pull: { courses: course._id },
      });
    }

    await courseModel.findByIdAndDelete(id);

    return res.json({ message: "Delete Course Success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postContentCourse = async (req, res) => {
  try {
    const body = req.body;

    const course = await courseModel.findById(body.courseId);

    const content = new courseDetailModel({
      title: body.title,
      type: body.type,
      youtubeId: body.youtubeId,
      text: body.text,
      course: course._id,
    });

    await content.save();

    await courseModel.findByIdAndUpdate(
      course._id,
      {
        $push: {
          details: content._id,
        },
      },
      { new: true }
    );

    return res.json({ message: "Create Content Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateContentCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const course = await courseModel.findById(body.courseId);

    await courseDetailModel.findByIdAndUpdate(
      id,
      {
        title: body.title,
        type: body.type,
        youtubeId: body.youtubeId,
        text: body.text,
        course: course._id,
      },
      { new: true }
    );

    return res.json({ message: "Update Content Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteContentCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await courseDetailModel.findByIdAndDelete(id);

    return res.json({ message: "Delete Course Content Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getDetailContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await courseDetailModel.findById(id);

    return res.json({
      message: "Get Detail Course Content success",
      data: content,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudentsByCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await courseModel.findById(id).select("name").populate({
      path: "students",
      select: "name email photo",
    });

    const imageURL = process.env.APP_URL + "/uploads/students/";
    const studentsMap = course?.students?.map((item) => {
      return {
        ...item.toObject(),
        photo_url: imageURL + item.photo,
      };
    });

    return res.json({
      message: "Get student by Course Success!",
      data: {
        ...course.toObject(),
        students: studentsMap,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const postStudentToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await userModel.findByIdAndUpdate(body.studentId, {
      $push: {
        courses: id,
      },
    });

    await courseModel.findByIdAndUpdate(id, {
      $push: {
        students: body.studentId,
      },
    });

    return res.json({ message: "Add Student to Course Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStudentToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await userModel.findByIdAndUpdate(body.studentId, {
      $pull: {
        courses: id,
      },
    });

    await courseModel.findByIdAndUpdate(id, {
      $pull: {
        students: body.studentId,
      },
    });

    return res.json({ message: "Delete Student to Course Success!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
