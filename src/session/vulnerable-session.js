const session = require("express-session");

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function createVulnerableSession() {
  return session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "local-demo-session-secret",
    resave: false,
    saveUninitialized: false,
    // Intentionally insecure for this local classroom lab.
    cookie: {
      httpOnly: false,
      secure: false,
      sameSite: false,
      maxAge: ONE_DAY_MS
    }
  });
}

module.exports = {
  createVulnerableSession,
  ONE_DAY_MS
};
