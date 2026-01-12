const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

/* SEMUA ROUTE USERS WAJIB LOGIN */
router.get("/", auth, userController.getAllUsers);
router.get("/:id", auth, userController.getUserById);
router.post("/", auth, userController.createUser);
router.put("/:id", auth, userController.updateUser);
router.delete("/:id", auth, userController.deleteUser);

module.exports = router;
