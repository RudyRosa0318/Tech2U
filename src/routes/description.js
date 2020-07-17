const express = require('express');
const router = express.Router();

const { description } = require('../controller/description.controller');



router.get('/description', (req, res) => {
     res.render('index');
 });

//  router.get('/',indexc);

module.exports = router;