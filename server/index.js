import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://admin-arshad:mongo0302@cluster0.khypjtz.mongodb.net/patientsDB",
  { useNewUrlParser: true }
);

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
