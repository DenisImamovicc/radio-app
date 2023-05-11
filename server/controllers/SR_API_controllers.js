import { getDataById, getAllList } from "../utils/functions.js";

export function getProgramCategory(req, res) {
  getDataById(req, res, req.params.id, "/programs/index?programcategoryid");
}

export function getChannelEpisodes(req, res) {
  getDataById(req, res, req.params.id, "/scheduledepisodes?channelid");
}

export function getProgramsfromChannel(req, res) {
  getDataById(req, res, req.params.id, "/programs/index?channelid");
}

export function getChannels(req, res) {
  getAllList(req, res);
}

export function getChannel(req, res) {
  getAllList(req, res);
}

export function getProgramCategories(req, res) {
  getAllList(req, res);
}
