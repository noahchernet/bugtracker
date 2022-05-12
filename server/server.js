import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv-flow";

import userRouter from "./routes/User.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

const DB_CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(DB_CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((err) => console.log(err));
