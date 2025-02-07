const sqlite3 = require("sqlite3").verbose();
const express = require("express");
const app = express();
const port = 3000;

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./user.db", (err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err.message);
  } else {
    console.log("Connexion à la base de données réussie.");
  }
});

// Création de la table users si elle n'existe pas déjà
const createTable = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL
)`;

db.run(createTable, (err) => {
  if (err) {
    console.error("Erreur lors de la création de la table :", err.message);
  } else {
    console.log("Table 'users' créée avec succès.");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de test pour vérifier si le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Hello, Express avec SQLite!");
});

// Route pour obtenir la liste des utilisateurs
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des utilisateurs :",
        err.message
      );
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
    res.json(rows);
  });
});

// Route pour ajouter un utilisateur
app.post("/users", (req, res) => {
  console.log("Requête reçue :", req.body); // Ajout du log
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Le nom et l'email sont requis." });
  }

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.run(sql, [name, email], function (err) {
    if (err) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", err.message);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'ajout de l'utilisateur" });
    }
    console.log(`Utilisateur ajouté avec l'ID ${this.lastID}`);
    res.json({ message: "Utilisateur ajouté", id: this.lastID });
  });
});

// Fermer la connexion à la base de données lors de l'arrêt du serveur
process.on("exit", () => {
  db.close((err) => {
    if (err) {
      console.error(
        "Erreur lors de la fermeture de la base de données :",
        err.message
      );
    } else {
      console.log("Connexion à la base de données fermée.");
    }
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Le serveur fonctionne sur http://localhost:${port}`);
});
