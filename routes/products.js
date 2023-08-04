const express = require("express");
const router = express.Router();

const {
  getAllProduct,
  getAllProductStatic,
} = require("../controller/products");

router.route("/").get(getAllProduct);
router.route("/static").get(getAllProductStatic);

module.exports = router;
