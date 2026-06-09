const { createFixedSession, LOCAL_FIXED_COOKIE_NAME, SECURE_FIXED_COOKIE_NAME } = require("./fixed-session");
const { createVulnerableSession, VULNERABLE_COOKIE_NAME } = require("./vulnerable-session");

const SESSION_MODES = {
  FIXED: "fixed",
  VULNERABLE: "vulnerable"
};

function readBoolean(value, defaultValue) {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
}

function normalizeMode(value) {
  const mode = String(value || SESSION_MODES.VULNERABLE).toLowerCase();

  if (!Object.values(SESSION_MODES).includes(mode)) {
    throw new Error(`Unsupported SESSION_MODE: ${mode}`);
  }

  return mode;
}

function resolveSessionMode(options = {}, env = process.env) {
  const mode = normalizeMode(options.sessionMode || env.SESSION_MODE);

  if (mode === SESSION_MODES.FIXED) {
    const secureCookie =
      options.secureCookie === undefined
        ? readBoolean(env.SESSION_COOKIE_SECURE, true)
        : options.secureCookie !== false;
    const cookieName =
      options.cookieName || (secureCookie ? SECURE_FIXED_COOKIE_NAME : LOCAL_FIXED_COOKIE_NAME);

    return {
      cookieName,
      isFixed: true,
      mode,
      middleware: createFixedSession({ cookieName, secureCookie }),
      secureCookie,
      trustProxy:
        options.trustProxy === undefined
          ? readBoolean(env.SESSION_TRUST_PROXY, secureCookie)
          : options.trustProxy === true
    };
  }

  return {
    cookieName: VULNERABLE_COOKIE_NAME,
    isFixed: false,
    mode,
    middleware: createVulnerableSession(),
    secureCookie: false,
    trustProxy: false
  };
}

module.exports = {
  SESSION_MODES,
  resolveSessionMode
};
