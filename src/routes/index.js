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
  renderCart

} = require("../controller/index.controller");


router.get("/", renderIndex);

router.get("/description", renderDescription);
router.get("/description/:id", obtenerProductoPorId);


router.post("/checkout", async (req, res) => {
  console.log(req.body);
  const prod = await pool.query("SELECT * FROM product");
  const user = await pool.query("SELECT * FROM users");
  const { price, description } = req.params;
  const { idUser } = req.params;
  // Crea un Payment Intent para iniciar un flujo de compra.
  let paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: "usd",
    description: "Mi primer pago",
  });

  // Completa el pago usando una tarjeta de prueba.
  paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id, {
    payment_method: "pm_card_amex",
  });

  const customer = await stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  });
  const charge = stripe.charges.create({
    amount: 20,
    currency: price,
    customer: idUser,
    description: description,
  });
  console.log(charge);
  console.log(customer);
  console.log(description);
  console.log(price);

  res.send("Recibido");
});

module.exports = router;
