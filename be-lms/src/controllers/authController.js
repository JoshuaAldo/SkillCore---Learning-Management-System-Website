import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import jwt from "jsonwebtoken";

export const signUpAction = async (req, res) => {
  const midtransUrl = process.env.MIDTRANS_URL;
  const authString = process.env.MIDTRANS_AUTH_STRING;
  const host = process.env.APP_FE_URL;
  try {
    const body = req.body; //name, email, password

    const hashPassword = bcrypt.hashSync(body.password, 12);

    const user = new userModel({
      name: body.name,
      email: body.email,
      photo: "default.png",
      password: hashPassword,
      role: "manager",
    });

    //action Payment Gateway midtrans

    const transaction = new transactionModel({
      user: user._id,
      price: 280000,
    });

    const midtrans = await fetch(midtransUrl, {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: transaction._id.toString(),
          gross_amount: transaction.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
        callbacks: { finish: `${host}/success-checkout` },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
    });

    const resMidtrans = await midtrans.json();

    await user.save();
    await transaction.save();

    return res.json({
      message: "Sign Up Success",
      data: {
        midtrans_payment_url: resMidtrans.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const signInAction = async (req, res) => {
  try {
    const body = req.body;
    const existingUser = await userModel
      .findOne()
      .where("email")
      .equals(body.email);
    if (!existingUser) {
      return res.status(400).json({ message: "User not Found" });
    }

    const comparePassword = bcrypt.compareSync(
      body.password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const isValidUser = await transactionModel.findOne({
      user: existingUser._id,
      status: "success",
    });
    console.log(existingUser._id);

    if (existingUser.role != "student" && !isValidUser) {
      return res.status(400).json({ message: "User not verified" });
    }
    const token = jwt.sign(
      {
        data: {
          id: existingUser._id.toString(),
        },
      },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "1d" }
    );

    let userRole;
    if (existingUser.role === "student") {
      userRole = "students";
    } else if (existingUser.role === "manager") {
      userRole = "managers";
    }

    const imageURL = process.env.APP_URL + `/uploads/${userRole}/`;

    return res.json({
      message: "User Signed In success",
      data: {
        name: existingUser.name,
        email: existingUser.email,
        token,
        role: existingUser.role,
        profileImg: imageURL + existingUser.photo,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
