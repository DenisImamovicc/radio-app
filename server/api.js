import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import sqlite3 from "sqlite3";
import {addUserAccount} from "./model/sqlfuncs.js"
// import startDb from "./config/config.js"
import {
  authenticateToken,
  getFavoriteChannel,
  checkEmptyChannel,
  getFavoritePrograms,
  checkEmptyPrograms,
  comparePassword,
  matchPasswordFromDB,
  arrStrToArrObj,
  getUserTokenDB,
  getDataById,
  getAllList,
  checkDuplicate,
  grantAcessToken,
} from "./utils/functions.js";

export const db = new sqlite3.Database(
  "C:/Users/Work/Desktop/sqldbs/Radiouseracount.db",
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

const port = 9000;
const api = express();

dotenv.config();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.put("/favoritechannel/", authenticateToken, async (req, res) => {
  const emptyRow = await checkEmptyChannel(req.body);
  const currentFavs = arrStrToArrObj(emptyRow, oldData);
  const oldData = await getFavoriteChannel(req.body.Email);

  if (!emptyRow) {
    db.run(
      "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?",
      [JSON.stringify([req.body.channel]), req.body.Email],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  } else if (checkDuplicate(currentFavs, req.body.channel.id)) {
    currentFavs.unshift(req.body.channel);
    db.run(
      "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?",
      [JSON.stringify(currentFavs), req.body.Email],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  }

  res.sendStatus(200);
});

api.get("/favoritechannels/:Email", authenticateToken, async (req, res) => {
  const Email = req.params.Email;
  const data = await getFavoriteChannel(Email);
  const modified = arrStrToArrObj(data.Favoritechannels, data);

  if (data.Favoritechannels) {
    res.status(200).send(modified);
  } else {
    res
      .status(404)
      .send({ error: `There is no data on Favoritechannels for ${Email}` });
  }
});

api.get("/favoriteprograms/:Email", authenticateToken, async (req, res) => {
  const Email = req.params.Email;
  const data = await getFavoritePrograms(Email);

  const modified = arrStrToArrObj(data.Favoriteprograms, data);
  if (data.Favoriteprograms) {
    res.status(200).send(modified);
  } else {
    res
      .status(404)
      .send({ error: `There is no data on Favoriteprograms for ${Email}` });
  }
});

api.delete(
  "/unfavoritechannel/:id/:Email",
  authenticateToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const Email = req.params.Email;
    const modifiedData = arrStrToArrObj(data.Favoritechannels, data);
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

api.delete(
  "/unfavoriteprogram/:id/:Email",
  authenticateToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const Email = req.params.Email;
    const modifiedData = arrStrToArrObj(data.Favoriteprograms, data);
    const data = await getFavoritePrograms(Email);
    const newData = modifiedData.filter((obj) => obj.id !== id);
    const deletedData = modifiedData.filter((obj) => obj.id === id);
    console.log(newData);

    db.run(
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

api.put("/favoriteprogram", authenticateToken, async (req, res) => {
  const data = req.body;
  const emptyRow = await checkEmptyPrograms(data);
  const currentFavs = arrStrToArrObj(emptyRow, oldData);
  const oldData = await getFavoritePrograms(data.userEmail);

  if (!emptyRow) {
    console.log("went to if");
    db.run(
      "UPDATE Useracounts SET Favoriteprograms = ? WHERE Email = ?",
      [JSON.stringify([data]), data.userEmail],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  } else if (checkDuplicate(currentFavs, data.id)) {
    currentFavs.unshift(data);
    db.run(
      "UPDATE Useracounts SET Favoriteprograms = ? WHERE Email = ?",
      [JSON.stringify(currentFavs), data.userEmail],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  }

  res.sendStatus(200);
});


api.post("/loginacount", async (req, res) => { 
  if (await matchPasswordFromDB(req.body)) {
    res.status(200).json({ mssg: "User logged in!", acessToken: grantAcessToken(req.body) });
  } else {
    res.sendStatus(401);
  }
});

api.post("/newacount", async (req, res) => addUserAccount(req,res,req.body.Email,await bcrypt.hash(req.body.Password, 10)))

api.get("/programscategorie/:id", (req, res) => getDataById(req, res, req.params.id,"/programs/index?programcategoryid"))

api.get("/schedulechannel/:id", (req, res) => getDataById(req, res, req.params.id,"/scheduledepisodes?channelid"))

api.get("/programschannel/:id", (req, res) => getDataById(req, res, req.params.id,"/programs/index?channelid"))

api.get("/channels", (req, res) => getAllList(req, res))

api.get("/channels/:id", (req, res) => getAllList(req, res))

api.get("/programcategories", (req, res) => getAllList(req, res))

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));