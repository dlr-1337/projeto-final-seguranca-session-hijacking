const request = require("supertest");

const { createApp } = require("../src/server");

describe("app shell", () => {
  it("renders the login page", async () => {
    const app = createApp();

    const response = await request(app).get("/login");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Entrar no laboratorio");
  });

  it("renders the dashboard with fake private data", async () => {
    const app = createApp();

    const response = await request(app).get("/dashboard");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Painel protegido");
    expect(response.text).toContain("Relatorio interno ficticio");
  });

  it("accepts documented fake credentials and returns dashboard HTML", async () => {
    const app = createApp();

    const response = await request(app)
      .post("/login")
      .type("form")
      .send({ username: "alice", password: "alice123" });

    expect(response.status).toBe(200);
    expect(response.text).toContain("Alice Demo");
    expect(response.text).toContain("Relatorio interno ficticio");
  });
});
