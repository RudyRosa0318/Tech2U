const log = {};
const passport = require("passport");
const pool = require("../model/database");

const crypto = require("crypto");

const enviarCorreo = require("../helpers/email");

const bcrypt = require("bcrypt-nodejs");
require('dotenv').config();

log.loadSignup = (req, res) => {
  res.render("auth/signup");
};

log.signUp = passport.authenticate("local.signup", {
  successRedirect: "/profile",
  failureRedirect: "/signup",
  failureFlash: true,
});

log.loadSignIn = (req, res, next) => {
  res.render("auth/signin");
};

log.signIn = passport.authenticate("local.signin", {
  successRedirect: "/profile",
  failureRedirect: "/signin",
  failureFlash: true,
});

log.pro = (req, res) => {
  const carrito = req.session.cart;
  res.render("profile", { carrito });
};

log.out = (req, res) => {
  req.session.cart = [];
  req.logOut();
  res.redirect("/");
  res.redirect(req.get("referer"));
};

log.superuser = async (req, res) => {
  const {idUser } = req.params;
  const {secretA,nameID} = req.body;
  if (secretA == process.env.ADMINPASS) {
    await pool.query("UPDATE users set userType= ? WHERE idUser = ?", [1, nameID]);
    req.flash("success", "Ahora eres Administrador!");
    console.log(idUser);
    res.redirect("/links");
  } else {
    req.flash("warning", "Codigo incorrecto!");
    res.redirect("/profile");
  }
};

log.enviarToken = async (req, res, next) => {
  // Verificar si existe el usuario
  const { email } = req.body;
  const usuario = await pool.query(
    "SELECT * from users WHERE  email = ?",
    [email]
  );
  console.log(usuario);

  // Si el usuario no existe
  if (!usuario) {
    req.flash("error", "¡Este usuario no está registrado en Tech2u!");
    res.redirect("/restablecer_password");
  }
  const token = crypto.randomBytes(20).toString("hex");
  const expiration = Date.now() + 3600000;
  // Limpiar los valores del token y de la expiración
  const newLinks = {
    token,
    expiration,
  };
  const { idUser } = usuario[0];
  await pool.query("UPDATE users set ? WHERE idUser = ?", [
    newLinks,
    idUser,
  ]);


  // URL de reestablecer contraseña
  const resetUrl = `http://${req.headers.host}/resetear_password/${token}`;

  // Enviar el correo electrónico al usuario con el link que contiene
  // el token generado
  await enviarCorreo.enviarCorreo({
    usuario:usuario[0],
    subject: "Restablece tu contraseña de Tech2u",
    resetUrl,
    vista: "email_restablecer",
    text:
      "Has solicitado restablecer tu contraseña de Tech2u! Autoriza el contenido HTML.",
  });

  // Redireccionar al usuario al inicio de sesión
  req.flash(
    "success",
    "Se envió un enlace para reestablecer tu contraseña a tu correo electrónico"
  );
  res.redirect("/signin");
};

log.formularioRestablecerPassword = (req, res, next) => {
  res.render("restablecer_password");
};


// Muestra el formulario de cambiar la contraseña si existe un token válido
log.validarToken = async (req, res, next) => {
  try {
    // Buscar si el token enviado existe
    const { token } = req.params;

    const usuario = await pool.query(
      "SELECT * from users WHERE token = ?",
      [token]
    );


    // Si no se encuentra el usuario
    if (!usuario[0]) {
      req.flash("error", "¡El enlace que seguiste no es válido!");
      res.redirect("/restablecer_password");
    }else{
      // Si el usuario existe, mostrar el formulario de generar nueva contraseña
    res.render("resetear_password", { token });
    }

    
  } catch (error) {
    res.redirect("/signin");
  }
};

// Permite cambiar la contraseña de un token válido
log.actualizarPassword = async (req, res, next) => {
  // Obtener el usuario mediante el token y verificar que
  const usuario = await pool.query(
    "SELECT * from users WHERE token = ?",
    [req.params.token]
  );

  // Verificar que se obtiene un usuario
  if (!usuario) {
    req.flash(
      "error",
      "Token no válido o vencida. El token tiene 1 hora de validez"
    );
    
    res.redirect("/restablecer_password");
  }

  const token = null;
  const expiration = null;
  // Limpiar los valores del token y de la expiración
  const newLinks = {
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    token,
    expiration,
  };

  await pool.query("UPDATE users set ? WHERE idUser = ?", [
    newLinks,
    usuario[0].idUser,
  ]);


  // Redireccionar al inicio de sesión
  req.flash("success", "Tu contraseña se ha actualizado correctamente");
  res.redirect("/signin");
};







module.exports = log;
