import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, "../DB/Radiouseracount.db");

export const DB = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
    logDatabase();
  }
});

function logDatabase() {
  DB.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
      console.error(err.message);
      return;
    }

    tables.forEach((table) => {
      const tableName = table.name;
      DB.all(`SELECT * FROM ${tableName}`, (err, rows) => {
        if (err) {
          console.error(err.message);
          return;
        }

        console.log(`Table: ${tableName}`);
        console.log(rows);
      });
    });
  });
}
