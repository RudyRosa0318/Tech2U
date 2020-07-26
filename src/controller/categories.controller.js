const pool = require("../model/database");

const hud = {};

hud.AddCat = async (req, res) => {
    res.render("categories/add");
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
    res.render("categories/list", { cate });
  };

module.exports = hud;