import fetch from "node-fetch";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { matchPasswordFromDB } from "../model/sqlfuncs.js";

const SVERIGES_RADIO_API = `http://api.sr.se/api/v2`;
const JSON_FORMAT = `format=json`;

export const hashPassword = async (Password) => await bcrypt.hash(Password, 10);

export const comparePassword = async (user, DBPwd) =>
  await bcrypt.compare(user.Password, DBPwd.Password);

export const grantAcessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30min" });

export function checkDuplicate(currentdata, reqdataID, req, res) {
  console.log(currentdata, reqdataID);
  if (currentdata.some((obj) => obj.id === reqdataID)) {
    console.log("INDENTIFIED DUPES");
    res.sendStatus(401);
    return false;
  }
  console.log("NO DUPES :)");
  return true;
}

export function getAllList(req, res) {
  const TYPE = req.originalUrl.replace('/SR_api', '')
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

export function validateData(req, res, data, dataType) {
  if (data) {
    res.status(200).send(arrayify(data));
  } else {
    res.status(404).send({
      error: `There is no data on ${dataType} for ${req.params.Email}`,
    });
  }
}

export function arrayify(data) {
  return JSON.parse(data.slice(0, data.length));
}

export async function handleLoginUser(req, res) {
  if (await matchPasswordFromDB(req.body)) {
    res
      .status(200)
      .json({ mssg: "User logged in!", acessToken: grantAcessToken(req.body) });
  } else {
    res.sendStatus(401);
  }
}