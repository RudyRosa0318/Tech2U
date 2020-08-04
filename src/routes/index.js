const express = require("express");
const router = express.Router();
const pool = require("../model/database");

const {isLoggedin, isNotLoggedin} = require('../lib/auth');


const {
  renderIndex,
  renderDescription,
  obtenerProductoPorId,
  checkout,
  renderCart,
  obtenerProductoPorCategoria

} = require("../controller/index.controller");

router.get("/", renderIndex);

router.get("/description/:id", obtenerProductoPorId);

router.post("/checkout/:id", checkout)

router.get("/categories_index/:id",obtenerProductoPorCategoria);


module.exports = router;
