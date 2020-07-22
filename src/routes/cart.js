const express = require('express');
const router = express.Router();

const { cart } = require('../controller/cart.controller');



router.get('/cart', (req, res) => {
     res.render('cart');
 });

module.exports = router;