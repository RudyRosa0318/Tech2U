const express = require('express');
const router = express.Router();

const { AddLink, addtheLink, renderLinks, deleteLink, editLink, renderEditLink } = require('../controller/links.controller')


const pool = require('../database')

router.get('/add', AddLink);
router.post('/add', addtheLink);
router.get('/', renderLinks);
router.get('/delete/:id', deleteLink);
router.get('/edit/:id', renderEditLink);

router.get('/edit/:id', async(req,res) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: links[0]});
   
});
module.exports = router;
