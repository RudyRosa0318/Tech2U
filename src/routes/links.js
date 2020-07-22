const express = require('express');
const router = express.Router();

const { AddLink, addtheLink, renderLinks, deleteLink, editLink, renderEditLink } = require('../controller/links.controller')

//Añadir Productos
router.get('/add', AddLink);
router.post('/add', addtheLink);
//Cargar listado de productos
router.get('/', renderLinks);
//Borrar productos
router.get('/delete/:idProduct', deleteLink);
//Editar productos
router.get('/edit/:idProduct', renderEditLink);
router.post('/edit/:idProduct',editLink);



module.exports = router;
