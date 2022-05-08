import express from "express";
import { getUsers, getUser, createUser } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:username", getUser);
router.post("/", createUser);

export default router;
