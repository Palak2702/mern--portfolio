import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

import cors from "cors";
import userRouter from "./routes/User.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//configure env
dotenv.config();

//databse config
connectdb();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// rest object
const app = express();

// middelwares
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
