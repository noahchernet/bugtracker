import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/User.js";
import ticketRouter from "./routes/Ticket.js";
import commentRouter from "./routes/Comment.js";
import formidableMiddleware from "express-formidable";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(formidableMiddleware());

app.use("/users", userRouter);
app.use("/tickets", ticketRouter);
app.use("/comments", commentRouter);
app.use("/", (req, res) => {
  return res.status(200).json({ message: "Hello" });
});

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT || 5000;

// Check if running tests, if not connect to MongoDB
if (!process.env.BUN_TEST) {
  mongoose
    .connect(DB_CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((err) => console.log(err));
}

export default app;
