const request = require("supertest");

const { createApp } = require("../src/server");

function findCookie(response, prefix) {
  const cookies = response.headers["set-cookie"] || [];
  return cookies.find((cookie) => cookie.startsWith(prefix));
}

function toCookieHeader(setCookieValue) {
  return setCookieValue.split(";")[0];
}

async function loginVulnerable(app) {
  const response = await request(app)
    .post("/login")
    .type("form")
    .send({ username: "alice", password: "alice123" });

  return {
    response,
    sessionCookie: findCookie(response, "sid=")
  };
}

async function loginFixed(app) {
  const response = await request(app)
    .post("/login")
    .set("X-Forwarded-Proto", "https")
    .type("form")
    .send({ username: "alice", password: "alice123" });

  return {
    response,
    sessionCookie: findCookie(response, "__Host-session=")
  };
}

describe("mitigation verification", () => {
  it("keeps the before baseline: vulnerable sid replay reaches the dashboard", async () => {
    const app = createApp();
    const { response: loginResponse, sessionCookie } = await loginVulnerable(app);

    expect(loginResponse.status).toBe(302);
    expect(loginResponse.headers.location).toBe("/dashboard");
    expect(sessionCookie).toBeDefined();

    const replayResponse = await request(app)
      .get("/dashboard")
      .set("Cookie", toCookieHeader(sessionCookie));

    expect(replayResponse.status).toBe(200);
    expect(replayResponse.text).toContain("Painel protegido");
    expect(replayResponse.text).toContain("Alice Demo");
    expect(replayResponse.text).toContain("LAB-ALICE-001");
  });

  it("rejects an obsolete vulnerable sid after switching to fixed mode", async () => {
    const vulnerableApp = createApp();
    const { sessionCookie: vulnerableCookie } = await loginVulnerable(vulnerableApp);
    const fixedApp = createApp({
      sessionMode: "fixed",
      secureCookie: true,
      trustProxy: true
    });

    expect(vulnerableCookie).toBeDefined();

    const replayResponse = await request(fixedApp)
      .get("/dashboard")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", toCookieHeader(vulnerableCookie));

    expect(replayResponse.status).toBe(302);
    expect(replayResponse.headers.location).toBe("/login");
  });

  it("rejects a copied fixed cookie after logout destroys the server session", async () => {
    const app = createApp({
      sessionMode: "fixed",
      secureCookie: true,
      trustProxy: true
    });
    const { response: loginResponse, sessionCookie } = await loginFixed(app);

    expect(loginResponse.status).toBe(302);
    expect(loginResponse.headers.location).toBe("/dashboard");
    expect(sessionCookie).toBeDefined();

    const cookieHeader = toCookieHeader(sessionCookie);
    const beforeLogout = await request(app)
      .get("/dashboard")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", cookieHeader);

    expect(beforeLogout.status).toBe(200);
    expect(beforeLogout.text).toContain("Painel protegido");

    const logoutResponse = await request(app)
      .post("/logout")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", cookieHeader);

    expect(logoutResponse.status).toBe(302);
    expect(logoutResponse.headers.location).toBe("/login");

    const afterLogout = await request(app)
      .get("/dashboard")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", cookieHeader);

    expect(afterLogout.status).toBe(302);
    expect(afterLogout.headers.location).toBe("/login");
  });
});
