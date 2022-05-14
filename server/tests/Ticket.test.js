const request = require("supertest");
const app = require("../server");
const db = require("./config/db");
const Ticket = require("../models/Ticket");
require("dotenv").config({ override: true });

const agent = request.agent(app);
const auth = { Authorization: process.env.BEARER_TOKEN };

beforeAll(async () => {
  await db.connect();
  await db.clear(); // Clear the database in case it isn't empty
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

    expect(res.body).toMatchObject(foundTicket);
  });

  test("create without authentication", async () => {
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

describe("Update ticket", () => {
  test("Update a ticket", async () => {
    agent.set(auth);

    const { id } = await Ticket.findOne({});

    const res = await agent.put("/tickets/" + id).send({
      title: "Test ticket updated title",
      description: "The description of the test ticket has been updated",
      solved: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Test ticket updated title");
    expect(res.body.description).toBe(
      "The description of the test ticket has been updated"
    );

    expect(res.body).toHaveProperty("title", "Test ticket updated title");
    expect(res.body).toHaveProperty(
      "description",
      "The description of the test ticket has been updated"
    );
    expect(res.body.solved).toBeTruthy();
  });

  test("update without authentication", async () => {
    const { id } = await Ticket.findOne({});

    const res = await agent.put("/tickets/" + id).send({
      title: "Test ticket updated title",
      description: "The description of the test ticket has been updated",
      solved: true,
    });
    // Authentication token cleared in afterEach function,
    // so the request should be denied
    expect(res.statusCode).toBe(401);
  });
  test("update a non-existing ticket", async () => {
    agent.set(auth);
    const id = "127d4fc90cb4e91b8fb4536d";

    const res = await agent.put("/tickets/" + id).send({
      title: "Non-existing ticket",
      description: "The description of the test ticket has been updated",
      solved: true,
    });

    expect(res.body).toMatchObject({
      message: "Could not find ticket with id = " + id,
    });
    expect(res.statusCode).toBe(404);
  });

  test("update a ticket with invalid id", async () => {
    agent.set(auth);
    const id = 1234;

    const res = await agent.put("/tickets/" + id).send({
      title: "Invalid ID ticket",
      description: "The description of the test ticket has been updated",
      solved: true,
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      message: "id is invalid.",
    });
  });

  test("update ticket with empty title", async () => {
    agent.set(auth);

    const { id } = await Ticket.findOne({});

    const res = await agent.put("/tickets/" + id).send({
      title: "",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toMatchObject({
      message: "The title cannot be empty.",
    });
  });

  test("update title with another ticket's title", async () => {
    agent.set(auth);
    // Create a new ticket to update its title with another ticket's title
    const res_insert = await agent.post("/tickets").send({
      title: "Another test ticket",
      description: "Description of a test ticket",
      severity: 1,
    });

    const { _id } = res_insert.body;

    const res_update = await agent.put("/tickets/" + _id).send({
      title: "Test ticket updated title",
    });

    expect(res_update.body).toMatchObject({
      message:
        "A ticket with the same title already exists, please change the title",
    });
    expect(res_update.statusCode).toBe(400);
  });
});
