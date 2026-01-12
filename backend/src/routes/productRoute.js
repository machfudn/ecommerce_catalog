// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const { validateProduk } = require("../middlewares/validate");
const upload = require("../middlewares/upload");
const auth = require("../middlewares/auth");

// PUBLIC
router.get("/", controller.getAllProduk);
router.get("/:id", controller.getProdukById);

// PROTECTED (CUD)
router.post(
  "/",
  auth,
  upload.single("gambar"),
  validateProduk,
  controller.createProduk
);

router.put(
  "/:id",
  auth,
  upload.single("gambar"),
  validateProduk,
  controller.updateProduk
);

router.delete("/:id", auth, controller.deleteProduk);

module.exports = router;
