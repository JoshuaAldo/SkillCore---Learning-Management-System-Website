import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./utils/database.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import overviewRoutes from "./routes/overviewRoutes.js";
import managerRoutes from "./routes/managerRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const port = 3000;

app.use("/api", authRoutes);
app.use("/api", paymentRoutes);
app.use("/api", courseRoutes);
app.use("/api", studentRoutes);
app.use("/api", overviewRoutes);
app.use("/api", managerRoutes);
app.use("/api", profileRoutes);

app.listen(port, () => {
  console.log(`Skillcore app listening on port ${port}`);
});
