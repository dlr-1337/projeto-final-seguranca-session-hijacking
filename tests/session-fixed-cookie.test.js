const request = require("supertest");

const { createApp } = require("../src/server");

function findFixedSessionCookie(response) {
  const cookies = response.headers["set-cookie"] || [];
  return cookies.find((cookie) => cookie.startsWith("__Host-session="));
}

describe("fixed session cookie", () => {
  it("sets a secure fixed-mode cookie for valid fake credentials", async () => {
    const app = createApp({
      sessionMode: "fixed",
      secureCookie: true,
      trustProxy: true
    });

    const response = await request(app)
      .post("/login")
      .set("X-Forwarded-Proto", "https")
      .type("form")
      .send({ username: "alice", password: "alice123" });

    const sessionCookie = findFixedSessionCookie(response);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/dashboard");
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie).toContain("__Host-session=");
    expect(sessionCookie).toContain("HttpOnly");
    expect(sessionCookie).toContain("Secure");
    expect(sessionCookie).toContain("SameSite=Strict");
    expect(sessionCookie).toContain("Expires=");
    expect(sessionCookie).not.toContain("sid=");
  });
});
