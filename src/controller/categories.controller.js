const pool = require("../model/database");

const hud = {};

hud.AddCat = (req, res) => {
    const carrito = req.session.cart;
    res.render("categories/add",{carrito});
};

hud.AddTheCat = async (req, res) => {
    const {name} = req.body;
    const newCat = {
        name,
    }
    await pool.query("INSERT INTO category set ?", [newCat]);
    req.flash("success", "Guardado correctamente!");
    res.redirect("/categories");
}

hud.renderCat = async (req, res) => {
    const cate = await pool.query("SELECT * FROM category");
    const carrito = req.session.cart;
    res.render("categories/list", { cate, carrito });
  };

module.exports = hud;