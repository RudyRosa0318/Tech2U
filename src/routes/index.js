const express = require('express');
const router = express.Router();
const {rendex} = require('../controller/index.controller');

router.get('/index', rendex);

module.exports = router;