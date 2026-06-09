const request = require("supertest");

const { createApp } = require("../src/server");

function findSessionCookie(response) {
  const cookies = response.headers["set-cookie"] || [];
  return cookies.find((cookie) => cookie.startsWith("sid="));
}

function toCookieHeader(setCookieValue) {
  return setCookieValue.split(";")[0];
}

describe("session reuse attack", () => {
  it("reuses a copied sid cookie from a second local client", async () => {
    const app = createApp();

    const deniedResponse = await request(app).get("/dashboard");

    expect(deniedResponse.status).toBe(302);
    expect(deniedResponse.headers.location).toBe("/login");

    const loginResponse = await request(app)
      .post("/login")
      .type("form")
      .send({ username: "alice", password: "alice123" });

    const sessionCookie = findSessionCookie(loginResponse);

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
    expect(replayResponse.text).toContain("Relatorio interno ficticio");
  });
});
