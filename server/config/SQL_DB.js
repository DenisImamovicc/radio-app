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