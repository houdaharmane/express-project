const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const router = express.Router();

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

// Route pour obtenir tous les utilisateurs
router.get("/", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Route pour ajouter un utilisateur
router.post("/", (req, res) => {
  const { name, email, age } = req.body;
  db.run(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, name, email, age });
      }
    }
  );
});

// Route pour mettre à jour un utilisateur
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  db.run(
    "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?",
    [name, email, age, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Utilisateur non trouvé." });
      } else {
        res.json({ id, name, email, age });
      }
    }
  );
});

// Route pour supprimer un utilisateur
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé." });
    } else {
      res.json({ message: "Utilisateur supprimé avec succès." });
    }
  });
});

module.exports = router;
