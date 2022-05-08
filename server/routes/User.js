import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
} from "../controllers/User.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:username", getUser);
router.post("/", createUser);
router.put("/:username", updateUser);

export default router;
