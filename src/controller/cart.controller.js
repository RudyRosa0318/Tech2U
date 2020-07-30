const pool = require("../model/database");
const cart = {};

cart.renderCarts = (req, res) => {
  const carrito = req.session.cart;
  let total = 0;
  for (const index of carrito) {
    total = total + index.total;
  }
  res.render("cart", { carrito, total });
};

cart.addCart = async (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const carrito = req.session.cart;
  const { qty } = req.body;
  const { id } = req.params;
  //buscar los datos de producto a comprar nombre, precio,imagen
  const product = await pool.query(
    "SELECT * from product WHERE idProduct = ?",
    [id]
  );
  const { name, price, url_image } = product[0];
  carrito.push({
    idProduct: id,
    name,
    price,
    qty,
    total: price * qty,
    url_image,

  });
  req.session.cart = carrito;
  res.redirect("/cart");
};

module.exports = cart;
