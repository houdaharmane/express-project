// app.js

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/users");
require("dotenv").config(); // Chargement des variables d'environnement

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./users.db", (err) => {
  if (err) {
    console.error(
      "Erreur lors de la connexion à la base de données:",
      err.message
    );
  } else {
    console.log("Connecté à la base de données SQLite.");
  }
});

// Création de la table des utilisateurs si elle n'existe pas
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER
  )`,
  (err) => {
    if (err) {
      console.error("Erreur lors de la création de la table:", err.message);
    } else {
      console.log("Table des utilisateurs prête.");
    }
  }
);

// Routes
app.get("/", (req, res) => {
  res.send("Bienvenue sur le backend de gestion des utilisateurs !");
});
app.use("/api/users", userRoutes);

module.exports = app;
