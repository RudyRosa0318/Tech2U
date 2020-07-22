const pool = require("../model/database");

const hud = {};

res.AddLink = async (req, res) => {
    const category = await pool.query("SELECT * FROM category");
    res.render("links/add", { category });
};