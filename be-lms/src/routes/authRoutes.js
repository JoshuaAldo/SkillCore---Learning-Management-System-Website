import express from "express";
import { validateRequest } from "../middlewares/validateRequest.js";
import { signInSchema, signUpSchema, forgotPasswordSchema, resetPasswordSchema } from "../utils/schema.js";
import { signInAction, signUpAction, forgotPasswordAction, resetPasswordAction } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/sign-up", validateRequest(signUpSchema), signUpAction);
authRoutes.post("/sign-in", validateRequest(signInSchema), signInAction);
authRoutes.post("/forgot-password", validateRequest(forgotPasswordSchema), forgotPasswordAction);
authRoutes.post("/reset-password", validateRequest(resetPasswordSchema), resetPasswordAction);

export default authRoutes;
