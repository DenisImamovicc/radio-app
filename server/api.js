import express from "express";
import fetch from "node-fetch";

const port = 9000;
const api = express();
const SVERIGES_RADIO_API = `http://api.sr.se/api/v2`;
const JSON_FORMAT = `?format=json`;

function getAllList(req, res) {
  const TYPE = req.originalUrl;
  fetch(SVERIGES_RADIO_API + TYPE + JSON_FORMAT)
    .then((res) => res.json())
    .then((Data) => res.status(200).send(Data))
    .catch(function (err) {
      console.error("sent from catch", err.message);
      throw new Error(res.status(500).send(err));
    });
}

api.get("/channels", (req, res) => {
  getAllList(req, res);
});

api.get("/programs", (req, res) => {
  getAllList(req, res);
});

api.get("/programcategories", (req, res) => {
    getAllList(req, res);
  });

api.listen(port, () => console.log(port, `Live at http://localhost:${port}`));
