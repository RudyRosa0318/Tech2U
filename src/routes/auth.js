const express = require('express');
const router = express.Router();
const { isLoggedin, isNotLoggedin } = require('../lib/auth');
const { loadSignup, signUp, loadSignIn, signIn, out, pro, superuser, formularioRestablecerPassword,
    enviarToken,
    validarToken,
    actualizarPassword,  } = require('../controller/auth.controller')


// Registro
router.get('/signup', isNotLoggedin, loadSignup);
router.post('/signup', signUp);

// Login
router.get('/signin', isNotLoggedin, loadSignIn);
router.post('/signin', signIn);

//profile
router.get('/profile', isLoggedin, pro);
router.post('/profile', superuser);

//logout
router.get('/logout', out);

// Reestablecer la contraseña de un usuario
router.get(
    "/restablecer_password",
    formularioRestablecerPassword
);

router.post("/restablecer_password", enviarToken);

router.get("/resetear_password/:token", validarToken);

router.post(
    "/resetear_password/:token",
    actualizarPassword
);
module.exports = router;

