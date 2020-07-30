const express = require("express");
const router = express.Router();
const { isLoggedin, isNotLoggedin } = require("../lib/auth");
const { renderCarts, addCart } = require("../controller/cart.controller");

router.get("/cart", isLoggedin, renderCarts);
router.post("/cart/:id", isLoggedin, addCart);
router.post("/src/views/partials/navigation.hbs",isLoggedin, addCart);

module.exports = router;
