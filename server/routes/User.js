const express = require("express");
const userController = require("../controllers/User");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:username", userController.getUser);
router.post("/", userController.createUser);
router.put("/:username", userController.updateUser);

module.exports = router;
