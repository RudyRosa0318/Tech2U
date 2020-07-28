const express = require('express');
const router = express.Router();
const { renderCarts } = require('../controller/cart.controller');

router.get('/cart', renderCarts );


module.exports = router;