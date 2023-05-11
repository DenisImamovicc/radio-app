import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  deleteUserChannel,
  deleteUserProgram,
  getUserChannels,
  getUserPrograms,
  handleCreateAcount,
  handleLoginAcount,
  updateUserChannels,
  updateUserPrograms,
} from "../controllers/userControllers.js";

const router = express.Router();

router
  .get("/favoritechannels/:Email", authenticateToken, getUserChannels)
  .get("/favoriteprograms/:Email", authenticateToken, getUserPrograms)
  .delete("/unfavoritechannel/:id/:Email", authenticateToken, deleteUserChannel)
  .delete("/unfavoriteprogram/:id/:Email", authenticateToken, deleteUserProgram)
  .put("/favoritechannel", authenticateToken, updateUserChannels)
  .put("/favoriteprogram", authenticateToken, updateUserPrograms)
  .post("/loginacount", handleLoginAcount)
  .post("/newacount", handleCreateAcount)

export default router;
