import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import SR_API_route from "./routes/SR_API_route.js"
import userRoute from "./routes/userroute.js"
import cors from "cors"

const port = 9000;
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(cors({
    origin: '*'
}));
api.use(bodyParser.urlencoded({ extended: true }));

api.use("/users",userRoute)
api.use("/SR_api",SR_API_route)

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));