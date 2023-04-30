import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const port = 9000;
const api = express();
const SVERIGES_RADIO_API = `http://api.sr.se/api/v2`;
const JSON_FORMAT = `format=json`;

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database(
  "C:/Users/Work/Desktop/sqldbs/Radiouseracount.db",
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

//Reveal data from current table from db
db.all("SELECT * FROM Useracounts", (err, rows) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(rows);
  }
});


function getAllList(req, res) {
  const TYPE = req.originalUrl;
  fetch(SVERIGES_RADIO_API + TYPE + "?" + JSON_FORMAT)
    .then((res) => res.json())
    .then((Data) => res.status(200).send(Data))
    .catch(function (err) {
      console.error("sent from catch", err.message);
      throw new Error(res.status(500).send(err));
    });
}

function getDataById(req, res, id, params) {
  fetch(SVERIGES_RADIO_API + params + `=${id}` + "&" + JSON_FORMAT)
    .then((res) => res.json())
    .then((Data) => res.status(200).send(Data))
    .catch(function (err) {
      console.error("sent from catch", err.message);
      throw new Error(res.status(500).send(err));
    });
}

function checkEmailDb(data) {
  return new Promise(async(resolve, reject) => {
    try {
      db.get('SELECT Email FROM Useracounts WHERE Email=?', [data.Email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(!!row);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
}

api.post("/newacount", (req, res) => {
  const data = req.body;
  console.log(data);
  db.run(
    "INSERT INTO Useracounts (Email, Password) VALUES (?, ?)",
    [data.Email, data.Password],
    function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    }
  );

  res.sendStatus(200);
});
//Till nästa gång.
//skapa route som tar json objekt fylld med användarnamn och lös.
//Börja med att jämnföra förfrågans användarnamn med db lista av användarnamn för att se om den existerar som skapat konto.
//Om ingen matchning ge en 400ish respons om det matchas så matchar du lös från förfrågan och db och se om det matchar.

api.post("/loginacount",async(req, res) => {
  const data = req.body
  const emailExists = await checkEmailDb(data);

if (emailExists) {
  res.sendStatus(200)
} else {
  res.sendStatus(400)
}

  console.log(emailExists); // true or false
});

api.get("/programscategorie/:id", (req, res) => {
  let id = req.params.id;
  let params = "/programs/index?programcategoryid";
  getDataById(req, res, id, params);
});

api.get("/schedulechannel/:id", (req, res) => {
  let id = req.params.id;
  let params = "/scheduledepisodes?channelid";
  getDataById(req, res, id, params);
});

api.get("/programschannel/:id", (req, res) => {
  let id = req.params.id;
  let params = "/programs/index?channelid";
  getDataById(req, res, id, params);
});

api.get("/channels", (req, res) => {
  getAllList(req, res);
});

api.get("/programcategories", (req, res) => {
  getAllList(req, res);
});

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));
