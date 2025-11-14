const express = require("express");
const path = require("path");
const db = require("./database");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  db.all("SELECT * FROM tareas", (err, filas) => {
    res.render("lista", { tareas: filas });
  });
});

app.get("/agregar", (req, res) => {
  res.render("agregar");
});

app.post("/agregar", (req, res) => {
  const { titulo, descripcion } = req.body;
  db.run(
    "INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)",
    [titulo, descripcion],
    () => {
      res.redirect("/");
    }
  );
});

app.get("/editar/:id", (req, res) => {
  db.get("SELECT * FROM tareas WHERE id = ?", [req.params.id], (err, fila) => {
    res.render("editar", { tarea: fila });
  });
});

app.post("/editar/:id", (req, res) => {
  const { titulo, descripcion } = req.body;
  db.run(
    "UPDATE tareas SET titulo = ?, descripcion = ? WHERE id = ?",
    [titulo, descripcion, req.params.id],
    () => {
      res.redirect("/");
    }
  );
});

app.get("/eliminar/:id", (req, res) => {
  db.run("DELETE FROM tareas WHERE id = ?", [req.params.id], () => {
    res.redirect("/");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor corriendo en " + PORT));