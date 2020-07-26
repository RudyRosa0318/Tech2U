const log = {};
const passport = require('passport');
const pool = require("../model/database");

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

log.pro = (req, res) => {
    res.render('profile');
};

log.out = (req, res) => {
    req.logOut();
    res.redirect('/')
    res.redirect(req.get('referer'));
};

log.superuser = async (req, res) => {
    const { secretA, sumadre } = req.body;
    if (secretA == "admin") {
        await pool.query("UPDATE users set userType= ? WHERE idUser = ?", [0, 2]);
        req.flash("success", "Ahora eres Administrador!");
        console.log();
        res.redirect('/links');
    }   
    else {
        req.flash("warning", "Codigo incorrecto!");
        res.redirect('/profile');
    }

}

module.exports = log;