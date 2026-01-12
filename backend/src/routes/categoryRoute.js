// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");
const { validateKategori } = require("../middlewares/validate");
const auth = require("../middlewares/auth");

// PUBLIC
router.get("/", controller.getAllCategories);
router.get("/:id", controller.getCategoryById);

// PROTECTED (CUD)
router.post("/", auth, validateKategori, controller.createCategory);

router.put("/:id", auth, validateKategori, controller.updateCategory);

router.delete("/:id", auth, controller.deleteCategory);

module.exports = router;
