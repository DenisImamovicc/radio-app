import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import {
  addUserAccount,
  addFavoriteData,
  deleteFavoriteData,
} from "./model/sqlfuncs.js";

import {
  authenticateToken,
  getFavoriteChannel,
  getFavoritePrograms,
  arrayify,
  getDataById,
  getAllList,
  checkDuplicate,
  handleLoginUser,
  hashPassword,
  validateData,
} from "./utils/functions.js";

const port = 9000;
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.get("/favoritechannels/:Email", authenticateToken, async (req, res) => {
  validateData(req,res,await getFavoriteChannel(req.params.Email),"favoritechannel")
});

api.get("/favoriteprograms/:Email", authenticateToken, async (req, res) => {
  validateData(req,res,await getFavoritePrograms(req.params.Email),"favoriteprogram")
});

api.delete("/unfavoritechannel/:id/:Email",authenticateToken,async (req, res) => {
    const data = arrayify(await getFavoriteChannel(req.params.Email));
    const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));
    
    deleteFavoriteData(req,res,req.params.Email,JSON.stringify([modifiedData]),"favoritechannel");
  });

api.delete("/unfavoriteprogram/:id/:Email",authenticateToken,async (req, res) => {
    const data = arrayify(await getFavoritePrograms(req.params.Email));
    const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));
    
    deleteFavoriteData(req,res,req.params.Email,JSON.stringify([modifiedData]),"favoriteprogram");
});

api.put("/favoritechannel", authenticateToken, async (req, res) => {
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

api.put("/favoriteprogram", authenticateToken, async (req, res) => {
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

api.post("/loginacount", async (req, res) => handleLoginUser(req, res));

api.post("/newacount", async (req, res) =>
  addUserAccount(req, res, req.body.Email, hashPassword(req.body.Password))
);

api.get("/programscategorie/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/programs/index?programcategoryid")
);

api.get("/schedulechannel/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/scheduledepisodes?channelid")
);

api.get("/programschannel/:id", (req, res) =>
  getDataById(req, res, req.params.id, "/programs/index?channelid")
);

api.get("/channels", (req, res) => getAllList(req, res));

api.get("/channels/:id", (req, res) => getAllList(req, res));

api.get("/programcategories", (req, res) => getAllList(req, res));

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));