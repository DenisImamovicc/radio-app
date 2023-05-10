import { DB } from "../config/SQL_DB.js";

export async function addUserAccount(req, res, email, hashedPassword) {
  return new Promise((resolve, reject) => {
    DB.run(
      "INSERT INTO Useracounts (Email, Password) VALUES (?, ?)",
      [email, hashedPassword],
      function (err) {
        if (err) {
          reject(err);
          res.status(500).json({ mssg: err });
        } else {
          resolve(this.lastID);
        }
      }
    );
    res.status(200).json({ mssg: "New User Added in Database" });
  });
}

export async function addFavoriteData(req, res, userEmail, data, favtype) {
  const query =
    "favoritechannel" === favtype
      ? "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?"
      : "UPDATE Useracounts SET Favoriteprograms = ? WHERE Email = ?";

  return new Promise((resolve, reject) => {
    DB.run(query, [data, userEmail], function (err, row) {
      if (err) {
        reject(console.error(err.message));
        res.sendStatus(500);
      } else {
        resolve(row);
        res.status(200).json({ mssg: `${favtype} added to DB` });
      }
    });
  });
}

export async function deleteFavoriteData(req, res, userEmail, data, favtype) {
  const query =
    "favoritechannel" === favtype
      ? "UPDATE Useracounts SET Favoritechannels = ? WHERE Email = ?"
      : "UPDATE Useracounts SET Favoriteprograms = ? WHERE Email = ?";

  return new Promise((resolve, reject) => {
    DB.run(query, [data, userEmail], function (err, row) {
      if (err) {
        reject(console.error(err.message));
        res.sendStatus(500);
      } else {
        resolve(row);
        res.status(200).send({
          success: `Delete data with id ${req.params.id} successfully`,
        });
      }
    });
  });
}

// export async function getFavoriteData(req, res, userEmail,favtype) {
//   const query =
//     "favoritechannel" === favtype
//       ? "SELECT Favoritechannels FROM Useracounts WHERE Email = ?"
//       : "SELECT Favoriteprograms FROM Useracounts WHERE Email = ?";

//   return new Promise((resolve, reject) => {
//     DB.run(query, [userEmail], function (err, row) {
//       if (err) {
//         reject(console.error(err.message));
//         res.sendStatus(500);
//       } else {
//         resolve(row.Favoriteprograms);
//         res.status(200).send({
//           success: row.Favoriteprograms,
//         });
//       }
//     });
//   });
// }