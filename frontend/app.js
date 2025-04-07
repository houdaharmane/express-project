// Importer le module express
const express = require("express");

// Créer une application express
const app = express();

// Définir un port pour le serveur
const port = 3000;

// Définir une route de base qui répond à une requête GET
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
