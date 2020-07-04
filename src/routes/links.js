const express = require('express');
const router = express.Router();

const { AddLink, addtheLink, renderLinks, deleteLink, editLink, renderEditLink } = require('../controller/links.controller')


router.get('/add', AddLink);
router.post('/add', addtheLink);
router.get('/', renderLinks);
router.get('/delete/:id', deleteLink);
router.get('/edit/:id', renderEditLink);
router.post('/edit/:id',editLink);



module.exports = router;
