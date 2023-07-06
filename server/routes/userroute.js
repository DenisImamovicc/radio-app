import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  deleteUserChannel,
  deleteUserProgram,
  getUserChannels,
  getUserData,
  getUserPrograms,
  handleCreateAcount,
  handleLoginAcount,
  updateUserChannels,
  updateUserPrograms,
} from "../controllers/userControllers.js";

const router = express.Router();

router
  .get("/user/:Email", authenticateToken, getUserData)
  .get("/favoritechannels/:Email", authenticateToken, getUserChannels)
  .get("/favoriteprograms/:Email", authenticateToken, getUserPrograms)
  .delete("/unfavoritechannel/:id/:Email", authenticateToken, deleteUserChannel)
  .delete("/unfavoriteprogram/:id/:Email", authenticateToken, deleteUserProgram)
  .put("/favoritechannel/:id/:Email", authenticateToken, updateUserChannels)
  .put("/favoriteprogram/:id/:Email", authenticateToken, updateUserPrograms)
  .post("/loginacount", handleLoginAcount)
  .post("/newacount", handleCreateAcount)

export default router;
