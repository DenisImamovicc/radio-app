import express from "express";
import {
    addUserAccount,
    addFavoriteData,
    deleteFavoriteData,
    getFavoriteChannel,
    getFavoritePrograms,
  } from "../model/sqlfuncs.js";
  
  import {
    authenticateToken,
    arrayify,
    checkDuplicate,
    handleLoginUser,
    hashPassword,
    validateData,
  } from "../utils/functions.js";
  
  const router = express.Router()


router.get("/favoritechannels/:Email", authenticateToken, async (req, res) => {
    validateData(
      req,
      res,
      await getFavoriteChannel(req.params.Email),
      "favoritechannel"
    );
  });
  
  router.get("/favoriteprograms/:Email", authenticateToken, async (req, res) => {
    validateData(
      req,
      res,
      await getFavoritePrograms(req.params.Email),
      "favoriteprogram"
    );
  });
  
  router.delete(
    "/unfavoritechannel/:id/:Email",
    authenticateToken,
    async (req, res) => {
      const data = arrayify(await getFavoriteChannel(req.params.Email));
      const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));
  
      deleteFavoriteData(
        req,
        res,
        req.params.Email,
        JSON.stringify([modifiedData]),
        "favoritechannel"
      );
    }
  );
  
  router.delete(
    "/unfavoriteprogram/:id/:Email",
    authenticateToken,
    async (req, res) => {
      const data = arrayify(await getFavoritePrograms(req.params.Email));
      const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));
  
      deleteFavoriteData(
        req,
        res,
        req.params.Email,
        JSON.stringify([modifiedData]),
        "favoriteprogram"
      );
    }
  );
  
  router.put("/favoritechannel", authenticateToken, async (req, res) => {
    const oldData = await getFavoriteChannel(req.body.Email);
  
    if (!oldData) {
      await addFavoriteData(
        req,
        res,
        req.body.Email,
        JSON.stringify([req.body.channel]),
        "favoritechannel"
      );
    } else if (checkDuplicate(arrayify(oldData), req.body.channel.id, req, res)) {
      const data = arrayify(oldData);
      data.unshift(req.body.channel);
      await addFavoriteData(
        req,
        res,
        req.body.Email,
        JSON.stringify(data),
        "favoritechannel"
      );
    }
  });
  
  router.put("/favoriteprogram", authenticateToken, async (req, res) => {
    const oldData = await getFavoritePrograms(req.body.Email);
  
    if (!oldData) {
      await addFavoriteData(
        req,
        res,
        req.body.Email,
        JSON.stringify([req.body.program]),
        "favoriteprogram"
      );
    } else if (checkDuplicate(arrayify(oldData), req.body.program.id, req, res)) {
      const data = arrayify(oldData);
      data.unshift(req.body.program);
      await addFavoriteData(
        req,
        res,
        req.body.Email,
        JSON.stringify(data),
        "favoriteprogram"
      );
    }
  });
  
  router.post("/loginacount", async (req, res) => handleLoginUser(req, res));
  
  router.post("/newacount", async (req, res) =>
    addUserAccount(req, res, req.body.Email, hashPassword(req.body.Password))
  );

export default router