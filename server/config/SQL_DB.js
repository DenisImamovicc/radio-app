import sqlite3 from "sqlite3";

export const DB = new sqlite3.Database(
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