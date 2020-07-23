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
indexc.renderCart = (req, res) => {
  res.render("links/cart");
};

indexc.obtenerProductoPorId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const links = await pool.query(
      "SELECT C.name AS category, P.idProduct, P.name, P.description, P.price, P.idCategory, P.url_image,P.idImage,P.created_at,P.update_at FROM product AS P INNER JOIN category AS C ON p.idCategory = C.idCategory WHERE idProduct = ?",
      [id]
    );
    console.log(links[0]);
    res.render("products/description", {
      links: links[0],
    });
  } catch (error) {
    // res.redirect("/");
    res.send(error);
  }
};

module.exports = indexc;
