const session = require("express-session");

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const VULNERABLE_COOKIE_NAME = "sid";

function createVulnerableSession() {
  return session({
    name: VULNERABLE_COOKIE_NAME,
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
  ONE_DAY_MS,
  VULNERABLE_COOKIE_NAME
};
