const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const { isLoggedin, isNotLoggedin } = require('../lib/auth');
const { loadSignup, signUp, loadSignIn, signIn, out, pro, superuser, formularioRestablecerPassword,
    enviarToken,
    validarToken,
    actualizarPassword, } = require('../controller/auth.controller')


// Registro
router.get('/signup', isNotLoggedin, loadSignup);
router.post('/signup',
    body("email").notEmpty().trim(),
    body("password").notEmpty().trim(),
    signUp);

// Login
router.get('/signin', isNotLoggedin, loadSignIn);
router.post('/signin',
    body("fullname").notEmpty().trim(),
    body("email").notEmpty().trim(),
    body("password").notEmpty().trim(),
    signIn);

//profile
router.get('/profile', isLoggedin, pro);
router.post('/profile',
    body("secret").trim(),
    superuser);

//logout
router.get('/logout', out);

// Reestablecer la contraseña de un usuario
router.get(
    "/restablecer_password",
    formularioRestablecerPassword
);

router.post("/restablecer_password",
    body("email").notEmpty().trim(),
    enviarToken);

router.get("/resetear_password/:token", validarToken);

router.post(
    "/resetear_password/:token",
    body("password").notEmpty().trim(),
    actualizarPassword
);
module.exports = router;

