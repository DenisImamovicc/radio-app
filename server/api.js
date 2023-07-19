import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoute from "./routes/userroute.js"
import cors from "cors"
import cookieParser from "cookie-parser";

const port = 9000;
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(cors({
    origin: 'https://localhost:5173',
    
}));
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cookieParser());

api.use("/users",userRoute)
api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));