const request = require("supertest");

const { createApp } = require("../src/server");

function findFixedSessionCookie(response) {
  const cookies = response.headers["set-cookie"] || [];
  return cookies.find((cookie) => cookie.startsWith("__Host-session="));
}

function toCookieHeader(setCookieValue) {
  return setCookieValue.split(";")[0];
}

async function loginFixed(app) {
  const response = await request(app)
    .post("/login")
    .set("X-Forwarded-Proto", "https")
    .type("form")
    .send({ username: "alice", password: "alice123" });

  return {
    response,
    sessionCookie: findFixedSessionCookie(response)
  };
}

describe("fixed session logout", () => {
  it("destroys the server session and clears the fixed cookie", async () => {
    const app = createApp({
      sessionMode: "fixed",
      secureCookie: true,
      trustProxy: true
    });

    const { response: loginResponse, sessionCookie } = await loginFixed(app);

    expect(loginResponse.status).toBe(302);
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

    const clearedCookie = findFixedSessionCookie(logoutResponse);

    expect(logoutResponse.status).toBe(302);
    expect(logoutResponse.headers.location).toBe("/login");
    expect(clearedCookie).toBeDefined();
    expect(clearedCookie).toContain("Expires=Thu, 01 Jan 1970 00:00:00 GMT");

    const afterLogout = await request(app)
      .get("/dashboard")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", cookieHeader);

    expect(afterLogout.status).toBe(302);
    expect(afterLogout.headers.location).toBe("/login");
  });

  it("renders a POST logout form on the dashboard", async () => {
    const app = createApp({
      sessionMode: "fixed",
      secureCookie: true,
      trustProxy: true
    });

    const { sessionCookie } = await loginFixed(app);
    const response = await request(app)
      .get("/dashboard")
      .set("X-Forwarded-Proto", "https")
      .set("Cookie", toCookieHeader(sessionCookie));

    expect(response.status).toBe(200);
    expect(response.text).toContain('method="post"');
    expect(response.text).toContain('action="/logout"');
  });
});
