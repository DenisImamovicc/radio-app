import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import sqlite3 from "sqlite3";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const port = 9000;
const api = express();
const SVERIGES_RADIO_API = `http://api.sr.se/api/v2`;
const JSON_FORMAT = `format=json`;

dotenv.config();
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
// db.all("SELECT * FROM Useracounts", (err, rows) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(rows);
//   }
// });

function checkDuplicate(currentdata, reqdataID) {
  console.log(currentdata, reqdataID);
  if (currentdata.some((obj) => obj.id === reqdataID)) {
    console.log("INDENTIFIED DUPES");
    return false;
  }
  console.log("NO DUPES :)");
  return true;
}

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

function arrStrToArrObj(row, data) {
  if (row) {
    const currentFavs = JSON.parse(row.slice(0, data.length));
    return currentFavs;
  }
}

function getUserTokenDb(data) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Email FROM Useracounts WHERE Email=?`,
        [data],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(!!row);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function MatchPasswordFromDb(user) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Password FROM Useracounts WHERE Email=?`,
        [user.Email],
        (err, pwd) => {
          if (err) {
            reject(err);
          } else {
            resolve(comparePassword(user, pwd));
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

const comparePassword = async (user, dbPwd) =>
  await bcrypt.compare(user.Password, dbPwd.Password);

function CheckEmptyPrograms(data) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Favoriteprograms FROM Useracounts WHERE Email=?`,
        [data.userEmail],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row.Favoriteprograms);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function getFavoritePrograms(userid) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Favoriteprograms FROM Useracounts WHERE Email = ?`,
        [userid],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function checkEmptyChannel(data) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Favoritechannels FROM Useracounts WHERE Email=?`,
        [data.Email],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row.Favoritechannels);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}

function getFavoriteChannel(userid) {
  return new Promise(async (resolve, reject) => {
    try {
      db.get(
        `SELECT Favoritechannels FROM Useracounts WHERE Email = ?`,
        [userid],
        (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
}
//add this func to the rest of routes that need user auth.Then add delete route for logout to delete users auth token.
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

api.put("/favoritechannel/", authenticateToken, async (req, res) => {
  const data = req.body;
  // if(userlogin) then continue if not res.sendStatus(401).Implement login requriemtn down the line.
  const emptyRow = await checkEmptyChannel(data);
  const oldData = await getFavoriteChannel(data.Email);
  const currentFavs = arrStrToArrObj(emptyRow, oldData);

  if (!emptyRow) {
    console.log("went to if");
    db.run(
      "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?",
      [JSON.stringify([data.channel]), data.Email],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
      }
    );
  } else if (checkDuplicate(currentFavs, data.channel.id)) {
    currentFavs.unshift(data.channel);
    db.run(
      "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?",
      [JSON.stringify(currentFavs), data.Email],
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

//Find a way for client to send indentification of some sorts
//,email in params for beginning and token in the end,to be able to get clients data and give it as res.
//implement handling when faves are empty

api.get("/favoritechannels/:Email", authenticateToken, async (req, res) => {
  const Email = req.params.Email;
  const data = await getFavoriteChannel(Email);

  if (data.Favoritechannels) {
    const modified = arrStrToArrObj(data.Favoritechannels, data);
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

  if (data.Favoriteprograms) {
    const modified = arrStrToArrObj(data.Favoriteprograms, data);
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
    const data = await getFavoriteChannel(Email);
    const modifiedData = arrStrToArrObj(data.Favoritechannels, data);
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

    // if(userlogin) then continue if not res.sendStatus(401).Implement login requriemtn down the line.
  }
);

api.delete(
  "/unfavoriteprogram/:id/:Email",
  authenticateToken,
  async (req, res) => {
    const id = Number(req.params.id);
    const Email = req.params.Email;
    const data = await getFavoritePrograms(Email);
    const modifiedData = arrStrToArrObj(data.Favoriteprograms, data);
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

    // if(userlogin) then continue if not res.sendStatus(401).Implement login requriemtn down the line.
    // const currentFavs = arrStrToArrObj(emptyRow, oldData);
  }
);

api.put("/favoriteprogram", authenticateToken, async (req, res) => {
  const data = req.body;
  const emptyRow = await CheckEmptyPrograms(data);
  const oldData = await getFavoritePrograms(data.userEmail);
  const currentFavs = arrStrToArrObj(emptyRow, oldData);

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

api.post("/newacount", async (req, res) => {
  const data = req.body;

  const hashedPwd = await bcrypt.hash(data.Password, 10);
  console.log(data.Email, hashedPwd);
  db.run(
    "INSERT INTO Useracounts (Email, Password) VALUES (?, ?)",
    [data.Email, hashedPwd],
    function (err) {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      }
    }
  );

  res.status(200).json({ mssg: "New User Added in Database" });
});

api.post("/loginacount", async (req, res) => {
  const user = req.body;
 
  // const emailMatch = await MatchEmailFromDb(data.Email);
  const passwordMatch = await MatchPasswordFromDb(user);
  if (passwordMatch) {
    const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30min"});

    res.status(200).json({ mssg: "User logged in!", acessToken: acessToken });
  } else {
    res.sendStatus(401);
  }
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

api.get("/channels/:id", (req, res) => {
  getAllList(req, res);
});

api.get("/programcategories", (req, res) => {
  getAllList(req, res);
});

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));
