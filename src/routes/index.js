const express = require('express');
const router = express.Router();

const { indexc } = require('../controller/index.controller');



router.get('/', (req, res) => {
     res.render('index');
 });

//  router.get('/',indexc);

module.exports = router;