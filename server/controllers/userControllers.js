import {
  addUserAccount,
  addFavoriteData,
  deleteFavoriteData,
  getFavoriteChannel,
  getFavoritePrograms,
  checkExistingEmail,
  getAllUserData,
} from "../model/sqlfuncs.js";

import {
  arrayify,
  checkDuplicate,
  handleLoginUser,
  hashPassword,
  validateData,
} from "../utils/functions.js";

export async function getUserData(req, res) {
  validateData(
    req,
    res,
    await getAllUserData(req.params.Email),
    "User"
  );
}

export async function getUserChannels(req, res) {
  validateData(
    req,
    res,
    await getFavoriteChannel(req.params.Email),
    "favoritechannel"
  );
}

export async function getUserPrograms(req, res) {
  validateData(
    req,
    res,
    await getFavoritePrograms(req.params.Email),
    "favoriteprograms"
  );
}

export async function deleteUserChannel(req, res) {
  const data = arrayify(await getFavoriteChannel(req.params.Email));
  const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));

  deleteFavoriteData(
    req,
    res,
    req.params.Email,
    JSON.stringify(modifiedData),
    "favoritechannel"
  );
}

export async function deleteUserProgram(req, res) {
  const data = arrayify(await getFavoritePrograms(req.params.Email));
  const modifiedData = data.filter((obj) => obj.id !== Number(req.params.id));

  deleteFavoriteData(
    req,
    res,
    req.params.Email,
    JSON.stringify(modifiedData),
    "favoriteprograms"
  );
}

export async function handleLoginAcount(req, res) {
    handleLoginUser(req, res)
}

export async function handleCreateAcount(req, res) {

  await checkExistingEmail(req.body.Email) 
    ? addUserAccount(req, res, req.body.Email, await hashPassword(req.body.Password),req.body.Name)
    : res.sendStatus(400)
}

export async function updateUserChannels(req, res) {
  const oldData = await getFavoriteChannel(req.params.Email);
  if (!oldData) {
    await addFavoriteData(
      req,
      res,
      req.params.Email,
      JSON.stringify([req.body]),
      "favoritechannel"
    );
  } else if (checkDuplicate(arrayify(oldData), req.body.id, req, res)) {
    const data = arrayify(oldData);
    data.unshift(req.body);
    await addFavoriteData(
      req,
      res,
      req.params.Email,
      JSON.stringify(data),
      "favoritechannel"
    );
  }
}

export async function updateUserPrograms(req, res) {
  const oldData = await getFavoritePrograms(req.params.Email);
  if (!oldData) {
    await addFavoriteData(
      req,
      res,
      req.params.Email,
      JSON.stringify([req.body]),
      "favoriteprogram"
    );
  } else if (checkDuplicate(arrayify(oldData), req.body.id, req, res)) {
    const data = arrayify(oldData);
    data.unshift(req.body);
    await addFavoriteData(
      req,
      res,
      req.params.Email,
      JSON.stringify(data),
      "favoriteprogram"
    );
  }
}
