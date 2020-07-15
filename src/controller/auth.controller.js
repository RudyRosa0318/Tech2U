const log = {};
const passport = require('passport');

log.loadSignup = (req, res) => {
    res.render('auth/signup');
};

log.signUp = passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
});

log.loadSignIn = (req, res, next) => {
    res.render('auth/signin');
};

log.signIn = passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
});

log.pro = (req, res) =>{
    res.render('profile');
};

log.out = (req, res) => {
    req.logOut();
    res.redirect('/');
};

module.exports = log;