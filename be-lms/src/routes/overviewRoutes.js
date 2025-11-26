import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getOverviews } from "../controllers/overviewController.js";
import { getStudentEngagement } from "../controllers/statsController.js";

const overviewRoutes = express.Router();

overviewRoutes.get("/overviews", verifyToken, getOverviews);
overviewRoutes.get("/engagement", verifyToken, getStudentEngagement);

export default overviewRoutes;
