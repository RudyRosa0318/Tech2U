const express = require('express');
const router = express.Router();
const {isLoggedin, isNotLoggedin} = require('../lib/auth');
const { loadSignup, signUp, loadSignIn, signIn, out, pro,superuser } = require('../controller/auth.controller')


// Registro
router.get('/signup',isNotLoggedin, loadSignup);
router.post('/signup', signUp);

// Login
router.get('/signin',isNotLoggedin ,loadSignIn);
router.post('/signin', signIn);

//profile
router.get('/profile',isLoggedin,pro);
router.post('/profile',superuser);

//logout
router.get('/logout',out);
module.exports = router;

