import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/User.js";
import ticketRouter from "./routes/Ticket.js";
import commentRouter from "./routes/Comment.js";
import formidableMiddleware from "express-formidable";

const app = express();

// CORS configuration for credentials (cookies)
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Mount better-auth handler BEFORE formidable middleware
// better-auth handles its own body parsing
app.all("/api/auth/*", toNodeHandler(auth));

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
