import express from "express";
import { getDataById, getAllList } from "../utils/functions.js";

const router = express.Router();

router
  .get("/programscategorie/:id", (req, res) =>
    getDataById(req, res, req.params.id, "/programs/index?programcategoryid")
  )
  .get("/schedulechannel/:id", (req, res) =>
    getDataById(req, res, req.params.id, "/scheduledepisodes?channelid")
  )
  .get("/programschannel/:id", (req, res) =>
    getDataById(req, res, req.params.id, "/programs/index?channelid")
  )
  .get("/channels", (req, res) => getAllList(req, res))
  .get("/channels/:id", (req, res) => getAllList(req, res))
  .get("/programcategories", (req, res) => getAllList(req, res));

export default router;