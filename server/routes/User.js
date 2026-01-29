import express from "express";
import * as userController from "../controllers/User.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:username", userController.getUser);
router.post("/", userController.createUser);
router.put("/:username", userController.updateUser);

export default router;
