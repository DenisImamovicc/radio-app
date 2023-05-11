import express from "express";
import {
  getChannel,
  getChannelEpisodes,
  getChannels,
  getProgramCategories,
  getProgramCategory,
  getProgramsfromChannel,
} from "../controllers/SR_API_controllers.js";

const router = express.Router();

router
  .get("/programscategorie/:id", getProgramCategory)
  .get("/schedulechannel/:id", getChannelEpisodes)
  .get("/programschannel/:id", getProgramsfromChannel)
  .get("/channels", getChannels)
  .get("/channels/:id", getChannel)
  .get("/programcategories", getProgramCategories);

export default router;
