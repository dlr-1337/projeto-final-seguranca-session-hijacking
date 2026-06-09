const request = require("supertest");

const { createApp } = require("../src/server");

function findSessionCookie(response) {
  const cookies = response.headers["set-cookie"] || [];
  return cookies.find((cookie) => cookie.startsWith("sid="));
}

describe("vulnerable session cookie", () => {
  it("sets an intentionally insecure sid cookie for valid fake credentials", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/login")
      .type("form")
      .send({ username: "alice", password: "alice123" });

    const sessionCookie = findSessionCookie(response);

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/dashboard");
    expect(sessionCookie).toBeDefined();
    expect(sessionCookie).toContain("sid=");
    expect(sessionCookie).toContain("Expires=");
    expect(sessionCookie).not.toContain("HttpOnly");
    expect(sessionCookie).not.toContain("Secure");
    expect(sessionCookie).not.toContain("SameSite");
  });

  it("allows an authenticated agent to access fake private dashboard data", async () => {
    const app = createApp();
    const agent = request.agent(app);

    await agent
      .post("/login")
      .type("form")
      .send({ username: "alice", password: "alice123" })
      .expect(302);

    const response = await agent.get("/dashboard");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Painel protegido");
    expect(response.text).toContain("Alice Demo");
    expect(response.text).toContain("Relatorio interno ficticio");
  });
});
