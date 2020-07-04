const express = require('express');
const router = express.Router();

const { renderSignUp, signUp, renderSignIn, signIn, logout } = require('../controller/auth.controller')

// SIGNUP
router.get('/signup', renderSignUp);

module.exports = router;