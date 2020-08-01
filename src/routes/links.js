const express = require("express");
const router = express.Router();
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
router.post("/add", isLoggedin, addtheLink);
router.get("/", isLoggedin, renderLinks,);
router.get("/delete/:idProduct", isLoggedin, deleteLink);
router.get("/edit/:idProduct", isLoggedin, renderEditLink);
router.post("/edit/:idProduct", isLoggedin, editLink);


module.exports = router;
