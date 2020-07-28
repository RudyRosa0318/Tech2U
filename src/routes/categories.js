const express = require('express');
const router = express.Router();
const {isLoggedin} = require('../lib/auth');
const { AddCat,AddTheCat,renderCat } = require('../controller/categories.controller')

//Añadir categorias
router.get('/add',isLoggedin,AddCat);
router.post('/add', AddTheCat);
//Cargar listado de categorias
router.get('/',isLoggedin,renderCat);
//Borrar categorias 
router.get('/delete/:idCategory',isLoggedin);
//editar Categorias
router.get('/edit/:idCategory',isLoggedin);
router.post('/edit/:idCategory',isLoggedin);

module.exports = router;