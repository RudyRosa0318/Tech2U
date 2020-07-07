const express = require('express');
const router = express.Router();
const {rendex} = require('../controller/index.controller');

//router.get('/index', rendex);
router.get('/',(req, res ) => {
    res.render('index');
})
module.exports = router;