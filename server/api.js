import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userroute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 9000;
const api = express();
const allowedOrigins = ["https://sradio.onrender.com"];

dotenv.config();
api.use(bodyParser.json());
api.use(
  cors({
    origin: allowedOrigins,
  })
);
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cookieParser());

api.use("/users", userRoute);

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));
