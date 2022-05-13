const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/User");
const ticketRouter = require("./routes/Ticket");
require("dotenv-flow").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/tickets", ticketRouter);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err));
