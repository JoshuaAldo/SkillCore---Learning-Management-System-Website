import express from "express";
import { getManager } from "../controllers/managerController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const managerRoutes = express.Router();

managerRoutes.get("/manager", verifyToken, getManager);

export default managerRoutes;
