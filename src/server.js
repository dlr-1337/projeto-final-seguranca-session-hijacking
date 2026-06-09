const path = require("node:path");
const express = require("express");

const { findUserByCredentials } = require("./data/users");
const { requireAuth } = require("./middleware/require-auth");
const { createVulnerableSession } = require("./session/vulnerable-session");

function createApp() {
  const app = express();

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.urlencoded({ extended: false }));
  app.use(createVulnerableSession());
  app.use("/public", express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  app.get("/login", (req, res) => {
    res.render("login", { error: null, username: "" });
  });

  app.post("/login", (req, res) => {
    const { username = "", password = "" } = req.body;
    const user = findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).render("login", {
        error: "Credenciais invalidas. Use uma conta ficticia documentada no README.",
        username
      });
    }

    req.session.userId = user.id;
    return res.redirect("/dashboard");
  });

  app.get("/dashboard", requireAuth, (req, res) => {
    res.render("dashboard", { user: res.locals.user, mode: "vulnerable" });
  });

  return app;
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "127.0.0.1";
  const app = createApp();

  app.listen(port, host, () => {
    console.log(`Session Hijacking lab running at http://${host}:${port}`);
  });
}

module.exports = {
  createApp
};
