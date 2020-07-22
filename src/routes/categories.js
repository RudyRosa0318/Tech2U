const express = require('express');
const router = express.Router();
const {  } = require('../controller/categories.controller')

//Añadir categorias
router.get('/add');
//Cargar listado de categorias
router.get('/');
//Borrar categorias 
router.get('/delete/:idCategory');
//editar Categorias
router.get('/edit/:idCategory');
router.post('/edit/:idCategory');

module.exports = router;