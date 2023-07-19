import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { matchPasswordFromDB } from "../model/sqlfuncs.js";

export const hashPassword = async (Password) => await bcrypt.hash(Password, 10);

export const comparePassword = async (user, DBPwd) => {
  if (DBPwd  === undefined) {
    return null;
  }
  return await bcrypt.compare(user.Password, DBPwd.Password);
};

export const grantAcessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

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

export function validateData(req, res, data, dataType) {
  if (data) {
    res.status(200).send(data);
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
    const token = grantAcessToken(req.body);
    const maxAgeInMs = 7 * 24 * 60 * 60 * 1000
    res
      .status(200)
      .send({Name:"jwt",maxAge:maxAgeInMs,token:token});
  } else {
    res.sendStatus(400);
  }
}
