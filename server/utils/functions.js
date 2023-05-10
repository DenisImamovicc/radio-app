import fetch from "node-fetch";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {DB} from "../config/SQL_DB.js"

const SVERIGES_RADIO_API = `http://api.sr.se/api/v2`;
const JSON_FORMAT = `format=json`;

export function checkDuplicate(currentdata, reqdataID,req, res) {
  console.log(currentdata, reqdataID);
  if (currentdata.some((obj) => obj.id === reqdataID)) {
    console.log("INDENTIFIED DUPES");
    res.sendStatus(401)
    return false;
  }
  console.log("NO DUPES :)");
  return true;
}

export function getAllList(req, res) {
  const TYPE = req.originalUrl;
  fetch(SVERIGES_RADIO_API + TYPE + "?" + JSON_FORMAT)
    .then((res) => res.json())
    .then((Data) => res.status(200).send(Data))
    .catch((err) => {
      console.error("sent from catch", err.message);
      throw new Error(res.status(500).send(err));
    });
}

export function getDataById(req, res, id, params) {
  fetch(SVERIGES_RADIO_API + params + `=${id}` + "&" + JSON_FORMAT)
    .then((res) => res.json())
    .then((Data) => res.status(200).send(Data))
    .catch((err) => {
      console.error("sent from catch", err.message);
      throw new Error(res.status(500).send(err));
    });
}

export function validateData(req,res,data,dataType) {
  if (data) {
    res.status(200).send(arrayify(data));
  } else {
    res
      .status(404)
      .send({
        error: `There is no data on ${dataType} for ${req.params.Email}`,
      });
  }
}

export function matchPasswordFromDB(user) {
  return new Promise(async (resolve, reject) => {
    try {
      DB.get(
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

export function arrayify(data) {
    return JSON.parse(data.slice(0, data.length)); 
}

export async function handleLoginUser (req, res) {
  if (await matchPasswordFromDB(req.body)) {
    res.status(200).json({ mssg: "User logged in!", acessToken: grantAcessToken(req.body) });
  } else {
    res.sendStatus(401);
  }
}

export const hashPassword = async (Password) => await bcrypt.hash(Password, 10);

export const comparePassword = async (user, DBPwd) => await bcrypt.compare(user.Password, DBPwd.Password);

export const grantAcessToken = (user) => jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30min",})

export function getFavoritePrograms(userid) {
  return new Promise(async (resolve, reject) => {
    try {
      DB.get(
        `SELECT Favoriteprograms FROM Useracounts WHERE Email = ?`,
        [userid],
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

export function getFavoriteChannel(userid) {
  return new Promise(async (resolve, reject) => {
    try {
      DB.get(
        `SELECT Favoritechannels FROM Useracounts WHERE Email = ?`,
        [userid],
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

export function authenticateToken(req, res, next) {
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