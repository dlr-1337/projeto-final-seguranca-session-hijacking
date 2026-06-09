const request = require("supertest");

const { createApp } = require("../src/server");

describe("app shell", () => {
  it("renders the login page", async () => {
    const app = createApp();

    const response = await request(app).get("/login");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Entrar no laboratorio");
  });

  it("redirects dashboard visitors without a session to login", async () => {
    const app = createApp();

    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/login");
  });

  it("rejects invalid fake credentials", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/login")
      .type("form")
      .send({ username: "alice", password: "wrong" });

    expect(response.status).toBe(401);
    expect(response.text).toContain("Credenciais invalidas");
  });
});
