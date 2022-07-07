const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/User");
const ticketRouter = require("./routes/Ticket");
const commentRouter = require("./routes/Comment");
const formidableMiddleware = require("express-formidable");
require("dotenv").config({ override: true });

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(formidableMiddleware());

app.use("/users", userRouter);
app.use("/tickets", ticketRouter);
app.use("/comments", commentRouter);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT || 5000;

// Check if Jest is running the server, if not
// connect to the MongoDB server provided in the environment
if (process.env.JEST_WORKER_ID === undefined) {
  mongoose
    .connect(DB_CONNECTION_URL)
    .then(() =>
      app.listen(PORT, () =>
        console.log(`Server Running on Port: http://localhost:${PORT}`)
      )
    )
    .catch((err) => console.log(err));
}

module.exports = app;
