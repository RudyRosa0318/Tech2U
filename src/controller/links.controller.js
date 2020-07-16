const pool = require("../model/database");

const res = {};

res.AddLink = (req, res) => {
  res.render("links/add");
};

res.addtheLink = async (req, res) => {
  const { name, description, price,category } = req.body;
  const { filename, originalname, mimetype, size } = req.file;
  const newImage = {idimage: filename,
    filename,
    originalname, 
    mimetype,
    size,
    path:"/img/upload/"+filename}
  const newLink = {
    name,
    description,
    price,
    category, //basedatos urlimg,image id,
    idimage : filename,
    url_image:"/img/upload/"+filename,
  };
   
  await pool.query("INSERT INTO product set ?", [newLink]);
  await pool.query("INSERT INTO image set ?", [newImage]);
  req.flash("success", "Guardado correctamente!");
  res.redirect("/links");
};

res.renderLinks = async (req, res) => {
  const links = await pool.query("SELECT * FROM product");
  res.render("links/list", { links });
};

res.deleteLink = async (req, res) => {
  const { idProduct } = req.params;
  await pool.query("DELETE FROM product WHERE idProduct = ?", [idProduct]);
  req.flash("success", "Eliminado correctamente!");
  res.redirect("/links");
};

res.renderEditLink = async (req, res) => {
  const { idProduct } = req.params;
  const link = await pool.query("SELECT * FROM product WHERE idProduct = ?", [idProduct]);
  res.render("links/edit", { link: link[0] });
};

res.editLink = async (req, res) => {
  const { idProduct } = req.params;
  const { name, price, description } = req.body;
  const newLink = {
    name,
    price,
    description,
    category,
  };
  await pool.query("UPDATE product set ? WHERE idProduct = ?", [newLink, idProduct]);
  req.flash("success", "Editado correctamente!");
  res.redirect("/links");
};

module.exports = res;
