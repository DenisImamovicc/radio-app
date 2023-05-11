import express from "express";
import { getDataById, getAllList } from "../utils/functions.js";

const router = express.Router()

router.get("/programscategorie/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/programs/index?programcategoryid")
);

router.get("/schedulechannel/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/scheduledepisodes?channelid")
);

router.get("/programschannel/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/programs/index?channelid")
);

router.get("/channels", (req, res) => getAllList(req, res));

router.get("/channels/:id", (req, res) => getAllList(req, res));

router.get("/programcategories", (req, res) => getAllList(req, res));

export default router