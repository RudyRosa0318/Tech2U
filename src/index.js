const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const { store } = require("express-session");
const MySQLStore = require("express-mysql-session");
const { database } = require("./keys");
const passport = require("passport");
//esto me sirve para manejar las imagenes
const multer = require("multer");
const shortid = require("shortid");

//Inicializar
const app = express();
require("./lib/passport");

//configuracion
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(flash());
app.use(
  session({
    secret: "ghjskdhf",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database),
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
});

//routas
//confgiuracion de almacenamiento de multer
const storage = multer.diskStorage({
  //se eligen donde se guarda la imagen
  destination: path.join(__dirname, "public/img/upload"),
  //se configura el nombre que tomara la imagen
  filename: (req, file, cb, filename) => {
    cb(null, shortid.generate() + path.extname(file.originalname));
  },
});
//configurando parametros de almacenamiento multer, solo aceptara una imagen.
app.use(
  multer({
    storage,
  }).single("imagen")
);

//rutas
app.use(require("./routes/index"));
app.use(require("./routes/auth"));
app.use(require("./routes/description"));

app.use("/links", require("./routes/links"));
app.use("/", require("./routes/index"));

//Public
app.use(express.static(path.join(__dirname, "public")));

//Servidor
app.listen(app.get("port"));
console.log("Servidor en el  puerto", app.get("port"));
