const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // <-- changer ici

const expect = chai.expect;
chai.use(chaiHttp);

let server;

describe("Users API", () => {
  before((done) => {
    server = app.listen(0, () => {
      console.log("Serveur de test lancé");
      done();
    });
  });

  after((done) => {
    server.close(() => {
      console.log("Serveur de test arrêté");
      done();
    });
  });

  beforeEach((done) => {
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("./users.db");
    db.serialize(() => {
      db.run("DELETE FROM users");
      const stmt = db.prepare(
        "INSERT INTO users (name, email, age) VALUES (?, ?, ?)"
      );
      stmt.run("Alice", "alice@example.com", 25);
      stmt.run("Bob", "bob@example.com", 30);
      stmt.finalize(done);
    });
  });

  describe("GET /api/users", () => {
    it("devrait récupérer tous les utilisateurs", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.equal(2);
          done();
        });
    });
  });
});
