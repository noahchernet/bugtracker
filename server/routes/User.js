import express from "express";
import { getUsers, getUser } from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:username", getUser);

export default router;
