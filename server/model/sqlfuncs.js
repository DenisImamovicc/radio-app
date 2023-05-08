import {DB} from "../config/SQL_DB.js"

export async function addUserAccount(req,res,email, hashedPassword) {
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