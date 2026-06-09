const session = require("express-session");

const FIXED_SESSION_MAX_AGE_MS = 5 * 60 * 1000;
const SECURE_FIXED_COOKIE_NAME = "__Host-session";
const LOCAL_FIXED_COOKIE_NAME = "sid";

function createFixedSession(options = {}) {
  const secureCookie = options.secureCookie !== false;
  const cookieName =
    options.cookieName || (secureCookie ? SECURE_FIXED_COOKIE_NAME : LOCAL_FIXED_COOKIE_NAME);

  if (cookieName.startsWith("__Host-") && !secureCookie) {
    throw new Error("__Host- cookies require secureCookie: true");
  }

  return session({
    name: cookieName,
    secret: process.env.SESSION_SECRET || "local-demo-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: secureCookie,
      sameSite: "strict",
      maxAge: FIXED_SESSION_MAX_AGE_MS,
      path: "/"
    }
  });
}

module.exports = {
  createFixedSession,
  FIXED_SESSION_MAX_AGE_MS,
  LOCAL_FIXED_COOKIE_NAME,
  SECURE_FIXED_COOKIE_NAME
};
