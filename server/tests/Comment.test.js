const request = require("supertest");
const app = require("../server");
const db = require("./config/db");
const Comment = require("../models/Comment").Comment;
const RemovedComment = require("../models/RemovedComment");
const Ticket = require("../models/Ticket");
require("dotenv").config({ override: true });

const agent = request.agent(app);

beforeAll(async () => {
  await db.connect();
  await db.clear(); // Clear the database in case it isn't empty
  agent.set({ Authorization: process.env.BEARER_TOKEN });

  await agent.post("/tickets").send({
    title: "A test ticket with comments",
    description: "Description of a test ticket, will have comments",
    severity: 1,
  });
});
afterAll(async () => {
  await db.clear();
  await db.close();
});

describe("Add comments to a ticket", () => {
  test("Add a single comment", async () => {
    const { id } = await Ticket.findOne({});

    const res = await agent.post("/comments/" + id).send({
      description: "First comment in the ticket",
    });
    const ticket = await Ticket.findOne({});

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({ message: "Comment added" });
    // console.log("Ticket in comment: ", ticket);
    expect((await Comment.findById(ticket.comments[0])).description).toBe(
      "First comment in the ticket"
    );
  });

  test("Add comment without authorization", async () => {
    agent.set({ Authorization: "" });
    const { id } = await Ticket.findOne({});

    const res = await agent.post("/comments/" + id).send({
      description: "Comment posted without authorization",
    });

    expect(res.statusCode).toBe(401);
    agent.set({ Authorization: process.env.BEARER_TOKEN });
  });
  test("Add comment to ticket with invalid id", async () => {
    const id = 12312314;

    const res = await agent.post("/comments/" + id).send({
      description: "Comment posted on non-existing ticket",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "id is invalid." });
  });

  test("Add comment to non-existing ticket", async () => {
    const id = "127d4fc90cb4e91b8fb4536d";

    const res = await agent.post("/comments/" + id).send({
      description: "Comment posted on non-existing ticket",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "Ticket could not be found" });
  });

  test("Add comment with empty description", async () => {
    const { id } = await Ticket.findOne({});

    const res = await agent.post("/comments/" + id).send({
      description: "",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ message: "Comment is empty" });
  });
  test("Add comment with non-existent description", async () => {
    const { id } = await Ticket.findOne({});

    const res = await agent.post("/comments/" + id);
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual({ message: "Comment is empty" });
  });
});

describe("Get comments of a ticket", () => {
  test("Comments of a ticket", async () => {
    const ticket = await Ticket.findOne({});

    expect((await Comment.findById(ticket.comments[0])).description).toBe(
      "First comment in the ticket"
    );
  });
});

describe("Update comment of a ticket", () => {
  test("Update an existing comment", async () => {
    const { id } = await Comment.findOne({});

    const res = await agent
      .put("/comments/" + id)
      .send({ description: "This comment is updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({ message: "Comment updated" });

    const comment = await Comment.findOne({});
    expect(comment.description).toEqual("This comment is updated");
  });
  test("Update ticket without authentication", async () => {
    agent.set({ Authorization: "" });
    const { id } = await Comment.findOne({});

    const res = await agent
      .put("/comments/" + id)
      .send({ description: "This comment is updated" });

    expect(res.statusCode).toBe(401);
    agent.set({ Authorization: process.env.BEARER_TOKEN });
  });

  test("Update comment with invalid id", async () => {
    const id = 12312314;

    const res = await agent
      .put("/comments/" + id)
      .send({ description: "This comment is updated" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "id is invalid." });
  });

  test("Update a comment to non-existing ticket", async () => {
    const id = "127d4fc90cb4e91b8fb4536d";

    const res = await agent
      .put("/comments/" + id)
      .send({ description: "This comment is updated" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "Comment could not be found" });
  });

  test("Update comment with empty description", async () => {
    const { id } = await Comment.findOne({});

    const res = await agent.put("/comments/" + id).send({
      description: "",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "Comment cannot be empty." });
  });
  test("Update comment with non-existent description", async () => {
    const { id } = await Comment.findOne({});

    const res = await agent.put("/comments/" + id).send({
      description: "",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body).toStrictEqual({ message: "Comment cannot be empty." });
  });
});

describe("Remove comment", () => {
  test("Remove ticket without authentication", async () => {
    agent.set({ Authorization: "" });
    const { id } = await Comment.findOne({});

    const res = await agent.delete("/tickets/" + id);
    expect(res.statusCode).toBe(401);
    agent.set({ Authorization: process.env.BEARER_TOKEN });
  });

  test("remove an existing comment", async () => {
    let commentToRemove = await Comment.findOne({});
    const id = commentToRemove.id;

    const res = await agent.delete("/comments/" + id);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      message: "Comment " + id + " removed successfully",
    });
    expect(await Comment.find({ _id: id })).toMatchObject({});

    // Deleted ticket should end up in the removedtickets collection
    let removedComment = await RemovedComment.findById(id);

    // Convert to JSON string and back to make their updatedAt properties modifiable
    commentToRemove = JSON.parse(JSON.stringify(commentToRemove));
    removedComment = JSON.parse(JSON.stringify(removedComment));

    // Removing both objects' updatedAt property since they have only a millisecond
    // of difference
    delete commentToRemove.updatedAt;
    delete removedComment.updatedAt;

    expect(removedComment).toMatchObject(commentToRemove);
  });
  test("delete a comment with invalid id", async () => {
    const id = 1234;

    const res = await agent.delete("/comments/" + id);

    expect(res.statusCode).toBe(404);
    expect(res.body).toMatchObject({
      message: "id is invalid.",
    });
  });

  test("delete a non-existing comment", async () => {
    const id = "127d4fc90cb4e91b8fb4536d";

    const res = await agent.delete("/comments/" + id);

    expect(res.body).toMatchObject({
      message: "Could not find comment with id = " + id,
    });
    expect(res.statusCode).toBe(404);
  });
});
