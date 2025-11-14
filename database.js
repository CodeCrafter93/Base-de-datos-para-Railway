const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./tareas.db", (err) => {
  if (err) console.error(err);
  else console.log("Base de datos conectada");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tareas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL
    )
  `);
});

module.exports = db;