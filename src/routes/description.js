const express = require('express');
const router = express.Router();
const {isLoggedin, isNotLoggedin} = require('../lib/auth');
const { renderIndexz } = require('../controller/description.controller');



router.get('/description',renderIndexz);

//  router.get('/',indexc);

module.exports = router;