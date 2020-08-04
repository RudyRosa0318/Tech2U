const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { isLoggedin } = require('../lib/auth');
const {
  AddLink,
  addtheLink,
  renderLinks,
  deleteLink,
  editLink,
  renderEditLink,
} = require("../controller/links.controller");


router.get("/add", isLoggedin, AddLink);
router.post("/add",
  body("name").trim().notEmpty(),
  body("qty").trim().notEmpty(),
  body("price").trim().notEmpty(),
  body("idCategory").trim().notEmpty(),
  body("description").trim().notEmpty(),
  body("url_image").trim().notEmpty(),
  isLoggedin, addtheLink);
router.get("/", isLoggedin, renderLinks,);
router.get("/delete/product/:idProduct", isLoggedin, deleteLink);
router.get("/edit/:idProduct", isLoggedin, renderEditLink);
router.post("/edit/:idProduct",

  isLoggedin, editLink);


module.exports = router;
