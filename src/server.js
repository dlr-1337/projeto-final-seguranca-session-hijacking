const path = require("node:path");
const express = require("express");

const { findUserByCredentials } = require("./data/users");
const { requireAuth } = require("./middleware/require-auth");
const { resolveSessionMode } = require("./session/session-mode");

function completeLogin(req, res, next, sessionMode, user) {
  const setUserAndRedirect = () => {
    req.session.userId = user.id;
    return res.redirect("/dashboard");
  };

  if (!sessionMode.isFixed || typeof req.session.regenerate !== "function") {
    return setUserAndRedirect();
  }

  return req.session.regenerate((error) => {
    if (error) {
      return next(error);
    }

    return setUserAndRedirect();
  });
}

function createApp(options = {}) {
  const app = express();
  const sessionMode = resolveSessionMode(options);

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));

  if (sessionMode.trustProxy) {
    app.set("trust proxy", 1);
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(sessionMode.middleware);
  app.use("/public", express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.redirect("/login");
  });

  app.get("/login", (req, res) => {
    res.render("login", { error: null, username: "" });
  });

  app.post("/login", (req, res, next) => {
    const { username = "", password = "" } = req.body;
    const user = findUserByCredentials(username, password);

    if (!user) {
      return res.status(401).render("login", {
        error: "Credenciais invalidas. Use uma conta ficticia documentada no README.",
        username
      });
    }

    return completeLogin(req, res, next, sessionMode, user);
  });

  app.get("/dashboard", requireAuth, (req, res) => {
    res.render("dashboard", { user: res.locals.user, mode: sessionMode.mode });
  });

  app.post("/logout", (req, res, next) => {
    const redirectAfterLogout = () => {
      res.clearCookie(sessionMode.cookieName, sessionMode.clearCookieOptions);
      return res.redirect("/login");
    };

    if (!req.session) {
      return redirectAfterLogout();
    }

    return req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      return redirectAfterLogout();
    });
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
