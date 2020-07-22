const express = require('express');
const router = express.Router();
const { AddCat,AddTheCat } = require('../controller/categories.controller')

//Añadir categorias
router.get('/add',AddCat);
router.post('/add', AddTheCat);
//Cargar listado de categorias
router.get('/');
//Borrar categorias 
router.get('/delete/:idCategory');
//editar Categorias
router.get('/edit/:idCategory');
router.post('/edit/:idCategory');

module.exports = router;