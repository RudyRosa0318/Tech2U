const express = require('express');
const router = express.Router();

const { AddLink, addtheLink, renderLinks, deleteLink, editLink, renderEditLink, renderCart } = require('../controller/links.controller')


router.get('/add', AddLink);
router.post('/add', addtheLink);
router.get('/', renderLinks);
router.get('/delete/:idProduct', deleteLink);
router.get('/edit/:idProduct', renderEditLink);
router.post('/edit/:idProduct',editLink);




module.exports = router;
