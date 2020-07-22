const indexc = {};
const pool = require("../model/database");
indexc.renderIndex = async(req, res) => {
  const products = await pool.query("SELECT * FROM product");
    res.render("index",{products});
};
indexc.renderDescription = (req, res) => {
  res.render("products/description");
};
indexc.renderCart = (req, res) => {
  res.render("links/cart");
};



indexc.obtenerProductoPorId = async (req, res, next) => {
  const  {id} = req.params;
  try {
    const links = await pool.query("SELECT * FROM product WHERE idProduct = ?", [
      id,
    ]);
    console.log(links[0]);
    res.render("products/description", {
      links:links[0]
    });
  } catch (error) {
    // res.redirect("/");
    res.send(error);
  }
};

module.exports = indexc;
