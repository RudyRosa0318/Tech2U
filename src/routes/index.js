const express = require("express");
const router = express.Router();
const pool = require("../model/database");

const {isLoggedin, isNotLoggedin} = require('../lib/auth');


const {
  renderIndex,
  renderDescription,
  obtenerProductoPorId,
  checkout,
  renderCart

} = require("../controller/index.controller");

router.get("/", renderIndex);

router.get("/description/:id", obtenerProductoPorId);

router.post("/checkout/:id", checkout)


module.exports = router;
