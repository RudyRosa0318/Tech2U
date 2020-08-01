const pool = require("../model/database");

const hud = {};

hud.AddCat = (req, res) => {
    const carrito = req.session.cart;
    res.render("categories/add", { carrito });
};

hud.AddTheCat = async (req, res) => {
    const { name } = req.body;
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
hud.renderEditCat = async (req, res) => {
    const {idCategory } = req.params;
    const category = await pool.query("SELECT * FROM category WHERE idCategory = ?", [idCategory]);
    res.render("categories/edit", { category: category[0]});
};
hud.editCat = async (req, res) => {
    const { idCategory } = req.params;
    const {name} = req.body;
    const nameUP = {
        name
    };
    await pool.query("UPDATE category set ? WHERE idCategory = ?", [nameUP, idCategory]);
    res.redirect("/categories");
};

hud.deleteCat = async (req, res) => {
    const { idCategory } = req.params;
    await pool.query("DELETE FROM category WHERE idCategory = ?", [idCategory]);
    req.flash("success", "Eliminado correctamente!");
    res.redirect("/categories");
  };

module.exports = hud;