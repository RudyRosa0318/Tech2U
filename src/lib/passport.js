const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../model/database");
const helper = require("../lib/helpers");

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      let newUser = {
        fullname,
        username,
        password,
      };
      //Encriptar contraseña
      newUser.password = await helper.encryption(password);
      // Guardar en la base de datos
      const result = await pool.query("INSERT INTO users SET ? ", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  done(null, rows[0]);
});

//passport para login
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM users WHERE username = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validationpass = await helper.check(
          password,
          user.password
        );
        if (validationpass) {
          done(null, user, req.flash("success", "Bienvenido " + user.username));
        } else {
          done(null, false, req.flash("Datos Incorrectos"));
        }
      } else {
        return done(
          null,
          false,
          req.flash("El usuario no existe.")
        );
      }
    }
  )
);