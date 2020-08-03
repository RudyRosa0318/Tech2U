require('dotenv').config();
const indexc = {};
const pool = require("../model/database");
const stripe = require("stripe")(process.env.STRIPE);
indexc.renderIndex = async (req, res) => {
  const products = await pool.query("SELECT * FROM product");
  const category = await pool.query("SELECT * FROM category");
  const carrito = req.session.cart;
  res.render("index", { products, category, carrito });
};


indexc.obtenerProductoPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const links = await pool.query(
      "SELECT C.name AS category, P.idProduct, P.name, P.description, P.price, P.idCategory, P.url_image,P.idImage,P.created_at,P.update_at FROM product AS P INNER JOIN category AS C ON p.idCategory = C.idCategory WHERE idProduct = ?",
      [id]
    );
    const carrito = req.session.cart;
    res.render("products/description", {
      links: links[0],
       carrito,
    });
  } catch (error) {
    res.send(error);
  }
};
//Asi se hacen los controllers
indexc.checkout = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);
  const user = await pool.query("SELECT * FROM users");
  const product = await pool.query(
    "SELECT * FROM product WHERE idProduct = ?",
    [id]
  );
  const { idUser } = req.params;
  const { price, name, description } = product[0];
  // Crea un Payment Intent para iniciar un flujo de compra.
  let paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "usd",
    description: name,
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
    currency: price * 100,
    customer: idUser,
    description: name,
  });
  // console.log(charge);
  // console.log(customer
  res.send("Recibido");
};

module.exports = indexc;
