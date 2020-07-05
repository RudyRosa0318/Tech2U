const express = require('express');
const router = express.Router();

const { loadSignup, signUp, renderSignIn, signIn, logout } = require('../controller/auth.controller')

// Registro
router.get('/signup', loadSignup);
router.post('/signup', signUp);

// Login
// router.get('/signin', renderSignIn);
// router.post('/signin', signIn);


module.exports = router;