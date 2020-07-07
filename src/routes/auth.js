const express = require('express');
const router = express.Router();

const { loadSignup, signUp, loadSignIn, signIn, logout } = require('../controller/auth.controller')

// Registro
router.get('/signup', loadSignup);
router.post('/signup', signUp);

// Login
router.get('/signin', loadSignIn);
router.post('/signin', signIn);


module.exports = router;