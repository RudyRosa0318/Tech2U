const express = require('express');
const router = express.Router();
const {isLoggedin, isNotLoggedin} = require('../lib/auth');
const { renderCarts } = require('../controller/cart.controller');

router.get('/cart',isLoggedin, renderCarts );


module.exports = router;