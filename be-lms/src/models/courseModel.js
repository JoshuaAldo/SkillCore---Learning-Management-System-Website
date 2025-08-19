import mongoose from "mongoose";
import courseDetailModel from "./courseDetailModel.js";
import categoriesModel from "./categoriesModel.js";
import userModel from "./userModel.js";

const courseModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  details: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseDetail",
    },
  ],
});

courseModel.post("findOneAndDelete", async (doc) => {
  if (doc) {
    await categoriesModel.findByIdAndUpdate(doc.category, {
      $pull: {
        courses: doc._id,
      },
    });

    await courseDetailModel.deleteMany({
      courses: doc._id,
    });

    doc.students?.map(async (std) => {
      await userModel.findByIdAndUpdate(std._id, {
        $pull: {
          courses: doc._id,
        },
      });
    });
  }
});

export default mongoose.model("Course", courseModel);
