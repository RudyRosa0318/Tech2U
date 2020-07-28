const express = require("express");
const router = express.Router();
const pool = require("../model/database");

const {isLoggedin, isNotLoggedin} = require('../lib/auth');

const stripe = require("stripe")(
  "sk_test_51H5lSsKfonblX5qIvwoTUBUJouItcvUbTLKlo2Ac7dlzybifJW1n7kj6XESVzhmSyS1p554Tf8SwAsLRnZvpIRAQ00T0PnH3hM"
);

const {
  renderIndex,
  renderDescription,
  obtenerProductoPorId,
  checkout,
  renderCart

} = require("../controller/index.controller");

router.get("/", renderIndex);
router.get("/description", renderDescription);
router.get("/description/:id", obtenerProductoPorId);

router.post("/checkout", checkout)

module.exports = router;
