const indexc = {};
const pool = require("../model/database");

indexc.renderIndex = async (req, res) => {
  const products = await pool.query("SELECT * FROM product");
  const category = await pool.query("SELECT * FROM category");

  res.render("index", { products, category });
};
indexc.renderDescription = (req, res) => {
  res.render("products/description");
};

indexc.obtenerProductoPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const links = await pool.query(
      "SELECT C.name AS category, P.idProduct, P.name, P.description, P.price, P.idCategory, P.url_image,P.idImage,P.created_at,P.update_at FROM product AS P INNER JOIN category AS C ON p.idCategory = C.idCategory WHERE idProduct = ?",
      [id]
    );
    res.render("products/description", {
      links: links[0],
    });
  } catch (error) {
    res.send(error);
  }
};
//Asi se hacen los controllers
indexc.checkout = async (req, res) => {
  const { idProduct } = req.params;

  console.log(req.body);
  const prod = await pool.query("SELECT * FROM product");
  const user = await pool.query("SELECT * FROM users");
  const Realprice = await pool.query(
    "SELECT price FROM product WHERE idProduct = ?",
    [idProduct]
  );
  const { price, description } = req.params;
  const { idUser } = req.params;
  // Crea un Payment Intent para iniciar un flujo de compra.
  let paymentIntent = await stripe.paymentIntents.create({
    amount: 50000,
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
  // console.log(charge);
  // console.log(customer);
  // console.log(description);
  // console.log(price);

  res.send("Recibido");
};

module.exports = indexc;
