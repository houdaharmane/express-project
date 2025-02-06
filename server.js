const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./user.db", (err) => {
  if (err) {
    console.error("Erreur de la connexion a la base de donnees" + err.message);
  } else {
    console.log("Connexion a la base de donnees reussie");
  }
});
