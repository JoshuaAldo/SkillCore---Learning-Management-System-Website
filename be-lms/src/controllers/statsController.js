import userModel from "../models/userModel.js";
import courseModel from "../models/courseModel.js";

export const getStudentEngagement = async (req, res) => {
  try {
    const totalStudents = await userModel.countDocuments({ role: "student" });

    if (totalStudents === 0) {
      return res.json({
        message: "No students found in the system.",
        data: {
          activePercentage: 0,
          inactivePercentage: 100,
          totalStudents: 0,
          activeStudents: 0,
        },
      });
    }

    const activeStudentsResult = await courseModel.aggregate([
      { $unwind: "$students" },
      { $group: { _id: "$students" } },
      { $count: "uniqueStudentCount" },
    ]);

    const activeStudents =
      activeStudentsResult.length > 0
        ? activeStudentsResult[0].uniqueStudentCount
        : 0;

    const activePercentage = Math.round((activeStudents / totalStudents) * 100);
    const inactivePercentage = 100 - activePercentage;

    return res.json({
      message: "Successfully fetched student engagement stats.",
      data: {
        activePercentage,
        inactivePercentage,
        totalStudents,
        activeStudents,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
