import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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

export const forgotPasswordAction = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Generate reset token (valid 1 hour)
    const resetToken = jwt.sign(
      { id: user._id.toString() },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "1h" }
    );

    // Send email with reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const resetLink = `${process.env.APP_FE_URL}/reset-password?token=${resetToken}`;
    const appName = "SkillCore"; // <-- Add your app's name here

    const emailBody = `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="text-align: center; color: #0056b3;">Password Reset Request</h2>
    <p>Hello,</p>
    <p>We received a request to reset the password for your account associated with this email address. Please click the button below to set a new password.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${resetLink}" style="background-color: #007BFF; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Your Password</a>
    </div>
    <p>This password reset link will expire in <strong>1 hour</strong>.</p>
    <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
    <p>Thank you,<br/>The ${appName} Team</p>
    <hr style="border: none; border-top: 1px solid #eee; margin-top: 20px;" />
    <p style="font-size: 12px; color: #888; text-align: center;">If you're having trouble clicking the button, copy and paste this URL into your browser:<br/><a href="${resetLink}" style="color: #007BFF;">${resetLink}</a></p>
  </div>
</div>`;

    await transporter.sendMail({
      from: `"${appName}" <${process.env.SMTP_USER}>`, // Recommended: Use app name as sender
      to: email,
      subject: "Your Password Reset Link",
      html: emailBody,
    });

    return res.json({ message: "Reset password link sent to email" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPasswordAction = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    const userId = decoded.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    user.password = bcrypt.hashSync(newPassword, 12);
    await user.save();
    return res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
