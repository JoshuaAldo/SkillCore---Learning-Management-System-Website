import userModel from "../models/userModel.js";

export const getManager = async (req, res) => {
  try {
    const students = await userModel
      .find({
        role: "manager",
      })
      .select("name courses photo");

    const imageURL = process.env.APP_URL + "/uploads/manager/";
    const response = students.map((item) => {
      return {
        ...item.toObject(),
        photo_url: imageURL + item.photo,
      };
    });

    return res.json({ message: "Get Manager Success!", data: response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
