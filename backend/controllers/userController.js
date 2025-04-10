const db = require("../db");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.addUser = (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "User added" });
    }
  );
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name, email, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User updated" });
    }
  );
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
};
