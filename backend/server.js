// server.js

// Importation de l'application depuis app.js
const app = require("./app");

// Définition du port depuis les variables d'environnement ou par défaut 3001
const port = process.env.PORT || 3001;

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
