const request = require("supertest");
const app = require("../server");
const db = require("./config/db");
const Ticket = require("../models/Ticket");

const agent = request.agent(app);
const auth = { Authorization: process.env.BEARER_TOKEN };

beforeAll(async () => {
  await db.connect();
});
afterEach(async () => {
  // await db.clear();
  agent.set({ Authorization: "" });
});
afterAll(async () => await db.close());

describe("Get Tickets", () => {
  // Since the tickets collection is empty, it should return empty
  test("Get all tickets", async () => {
    const res = await agent.get("/tickets");

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual([]);
  });
});

describe("Add Ticket", () => {
  test("add a single ticket", async () => {
    agent.set(auth);
    const res = await agent.post("/tickets").send({
      title: "A test ticket",
      description: "Description of a test ticket",
      severity: 1,
    });

    expect(res.statusCode).toBe(201);

    // Since createdAt and updatedAt in a foundTicket (of type Ticket) object are Date objects,
    // rather than strings, they will break the equality test since the response
    // of the post method's createdAt and updatedAt fields are strings. So, foundTicket
    // is converted to JSON string and back
    const foundTicket = JSON.parse(
      JSON.stringify(await Ticket.findById(res.body._id))
    );

    expect(res.body).toStrictEqual(foundTicket);
  });

  test("without authentication", async () => {
    const res = await agent.post("/tickets").send({
      title: "A test ticket",
      description: "Description of a test ticket",
      severity: 1,
    });

    // Authentication token cleared in afterEach function,
    // so the request should be denied
    expect(res.statusCode).toBe(401);
  });

  test("title that exists in the database", async () => {
    agent.set(auth);
    const res = await agent.post("/tickets").send({
      title: "A test ticket",
      description: "Description of a test ticket",
      severity: 1,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({
      message:
        "Post with the same title exists, please use a different title.",
    });
  });

  test("without title", async () => {
    agent.set(auth);
    const res = await agent.post("/tickets").send({
      description: "Description of a test ticket",
      severity: 1,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({
      message: "Full ticket information has to be provided.",
    });
  });

  test("without description", async () => {
    agent.set(auth);
    const res = await agent.post("/tickets").send({
      title: "A test ticket",
      severity: 1,
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({
      message: "Full ticket information has to be provided.",
    });
  });

  test("without severity", async () => {
    agent.set(auth);
    const res = await agent.post("/tickets").send({
      title: "A test ticket",
      description: "Description of a test ticket",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({
      message: "Full ticket information has to be provided.",
    });
  });
});
