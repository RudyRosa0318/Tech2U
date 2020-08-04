const express = require('express');
const router = express.Router();

const { isLoggedin } = require('../lib/auth');
const { AddCat, AddTheCat, renderCat, renderEditCat, editCat, deleteCat } = require('../controller/categories.controller');
const { body } = require('express-validator');

//Añadir categorias
router.get('/add', isLoggedin, AddCat);
router.post('/add',
    body("name").trim().notEmpty(),
    AddTheCat);
//Cargar listado de categorias
router.get('/', isLoggedin, renderCat);
//Borrar categorias 
router.get('/delete/:idCategory', isLoggedin, deleteCat);
//editar Categorias
router.get('/edit/:idCategory', isLoggedin, renderEditCat);
router.post('/edit/:idCategory',
    body("name").trim().notEmpty(),
    isLoggedin, editCat);

module.exports = router;        