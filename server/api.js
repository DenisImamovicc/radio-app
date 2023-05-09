import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import { addUserAccount,addFavoriteData} from "./model/sqlfuncs.js";
import {DB} from "./config/SQL_DB.js"

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
} from "./utils/functions.js";

//import DB from model
// export const db = new sqlite3.Database(
//   "C:/Users/Work/Desktop/sqldbs/Radiouseracount.db",
//   (err) => {
//     if (err) {
//       console.error(err.message);
//     } else {
//       console.log("Connected to the SQLite database.");
//     }
//   }
// );

const port = 9000;
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

//Till next time,make the if logic own func with flexibilty of taking and valueing favchannel or favprogram.

api.get("/favoritechannels/:Email", authenticateToken, async (req, res) => {
  const data = await getFavoriteChannel(req.params.Email);

  if (data) {
    res.status(200).send(arrayify(data));
  } else {
    res
      .status(404)
      .send({ error: `There is no data on Favoritechannels for ${req.params.Email}` });
  }
});

api.get("/favoriteprograms/:Email", authenticateToken, async (req, res) => {
  const data = await getFavoritePrograms(req.params.Email);
  
  if (data) {
    res.status(200).send(arrayify(data));
  } else {
    res
      .status(404)
      .send({ error: `There is no data on Favoriteprograms for ${req.params.Email}` });
  }
});

api.delete(
  "/unfavoritechannel/:id/:Email",
  authenticateToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const Email = req.params.Email;
    const modifiedData = arrayify(data.Favoritechannels, data);
    const data = await getFavoriteChannel(Email);
    const newData = modifiedData.filter((obj) => obj.id !== id);
    const deletedData = modifiedData.filter((obj) => obj.id === id);
    console.log(newData);

    db.run(
      "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?",
      [JSON.stringify(newData), Email],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(
            `${deletedData[0].name} with id ${deletedData[0].id} has been deleted from Favoritechannels row`
          );
        }
      }
    );
    res.status(200).send({
      success: `Delete ${deletedData[0].name} with id ${deletedData[0].id} successfully`,
    });
  }
);

api.delete("/unfavoriteprogram/:id/:Email",authenticateToken, async (req, res) => {

    const id = Number(req.params.id);
    const Email = req.params.Email;
    const modifiedData = arrayify(data.Favoriteprograms, data);
    const data = await getFavoritePrograms(Email);
    const newData = modifiedData.filter((obj) => obj.id !== id);
    const deletedData = modifiedData.filter((obj) => obj.id === id);

    DB.run(
      "UPDATE Useracounts SET Favoriteprograms = ? WHERE Email = ?",
      [JSON.stringify(newData), Email],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(
            `${deletedData[0].name} with id ${deletedData[0].id} has been deleted from Favoriteprograms row`
          );
        }
      }
    );
    res.status(200).send({
      success: `Delete ${deletedData[0].name} with id ${deletedData[0].id} successfully`,
    });
  }
);

//Under line has been refactored in code and folder assignmnet.
api.put("/favoritechannel", authenticateToken, async (req, res) => {
  const oldData = await getFavoriteChannel(req.body.Email);

  if (!oldData) {
    await addFavoriteData(req,res,req.body.Email,JSON.stringify([req.body.channel]),"favoritechannel") 

  } else if (checkDuplicate(arrayify(oldData), req.body.channel.id,req, res)) {
    const data = arrayify(oldData)
    data.unshift(req.body.channel);
    await addFavoriteData(req,res,req.body.Email,JSON.stringify(data),"favoritechannel") 
  }
});

api.put("/favoriteprogram", authenticateToken, async (req, res) => {
  const oldData = await getFavoritePrograms(req.body.Email);

  if (!oldData) {
    await addFavoriteData(req,res,req.body.Email,JSON.stringify([req.body.program]),"favoriteprogram") 

  } else if (checkDuplicate(arrayify(oldData), req.body.program.id,req, res)) {
    const data = arrayify(oldData)
    data.unshift(req.body.program);
    await addFavoriteData(req,res,req.body.Email,JSON.stringify(data),"favoriteprogram") 
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