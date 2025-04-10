const express = require("express");
<<<<<<< HEAD
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./users.db");

// Route GET pour récupérer tous les utilisateurs
router.get("/", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows); // Retourner les utilisateurs sous forme de tableau
  });
});

// Route GET pour récupérer un utilisateur par son ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.status(200).json(row); // Retourner l'utilisateur trouvé
  });
});

// Route POST pour ajouter un nouvel utilisateur
router.post("/", (req, res) => {
  const { name, email, age } = req.body;
  const stmt = db.prepare(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)"
  );
  stmt.run(name, email, age, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, email, age }); // Retourner l'utilisateur ajouté
  });
});

// Route PUT pour mettre à jour un utilisateur
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const stmt = db.prepare(
    "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?"
  );
  stmt.run(name, email, age, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.status(200).json({ id, name, email, age }); // Retourner l'utilisateur mis à jour
  });
});

// Route DELETE pour supprimer un utilisateur
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    res.status(200).json({ message: "Utilisateur supprimé." }); // Retourner un message de succès
=======
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
>>>>>>> 5feea03a860e1851f4a7432dfd45499e26af9716
  });
});

module.exports = router;
