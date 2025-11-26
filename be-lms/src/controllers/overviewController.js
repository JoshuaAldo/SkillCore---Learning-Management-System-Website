import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";

export const getOverviews = async (req, res) => {
  try {
    const totalCourses = await courseModel
      .find({
        manager: req.user._id,
      })
      .countDocuments();

    const courses = await courseModel.find({
      manager: req.user._id,
    });

    const totalStudents = await userModel.countDocuments({ role: "student" });

    const coursesVideo = await courseModel
      .find({
        manager: req.user._id,
      })
      .populate({
        path: "details",
        select: "name type",
        match: {
          type: "video",
        },
      });

    const totalVideos = coursesVideo.reduce(
      (acc, curr) => acc + curr.details.length,
      0
    );

    const coursesText = await courseModel
      .find({
        manager: req.user._id,
      })
      .populate({
        path: "details",
        select: "name type",
        match: {
          type: "text",
        },
      });

    const totalCourseTexts = coursesText.reduce(
      (acc, curr) => acc + curr.details.length,
      0
    );

    const coursesList = await courseModel
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
    const responseCourses = coursesList.map((item) => {
      return {
        ...item.toObject(),
        thumbnail_url: imageURL + item.thumbnail,
        total_students: item.students.length,
      };
    });

    const students = await userModel
      .find({
        role: "student",
        manager: req.user._id,
      })
      .select("name courses photo");

    const imageURLStudent = process.env.APP_URL + "/uploads/students/";
    const responseStudents = students.map((item) => {
      return {
        ...item.toObject(),
        photo_url: imageURLStudent + item.photo,
      };
    });

    return res.json({
      message: "Get Overview Success!",
      data: {
        totalCourses,
        totalStudents,
        totalVideos,
        totalCourseTexts,
        courses: responseCourses,
        students: responseStudents,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
