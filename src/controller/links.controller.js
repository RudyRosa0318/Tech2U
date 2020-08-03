const pool = require("../model/database");
const { unlink } = require("fs-extra");
const paths = require("path");
const { ifError } = require("assert");
const { user } = require("../config/email");
const res = {};

res.AddLink = async (req, res) => {
  const category = await pool.query("SELECT * FROM category");
  const carrito = req.session.cart;
  res.render("links/add", { category, carrito });
};

res.addtheLink = async (req, res) => {
  const { name, description, price, idCategory, url_image, qty } = req.body;
  if (req.file) {
    const { filename, originalname, mimetype, size, path } = req.file;
    const newImage = {
      idImage: filename,
      filename,
      originalname,
      mimetype,
      size,
      path: "/img/upload/" + filename,
    };
    const newLink = {
      name,
      description,
      price,
      idCategory,
      qty,
      idImage: filename,
      url_image: "/img/upload/" + filename,
    };
    await pool.query("INSERT INTO product set ?", [newLink]);
    await pool.query("INSERT INTO image set ?", [newImage]);
  } else {
    const newLink = {
      name,
      description,
      price,
      idCategory,
      url_image,
    };
    await pool.query("INSERT INTO product set ?", [newLink]);
  }

  req.flash("success", "Guardado correctamente!");
  res.redirect("/links");
};

res.renderLinks = async (req, res) => {
  const links = await pool.query(
    "SELECT C.name AS category, P.idProduct, P.name, P.description, P.price, P.idCategory, P.url_image,P.idImage,P.created_at,P.update_at FROM product AS P INNER JOIN category AS C ON P.idCategory = C.idCategory"
  );
  const carrito = req.session.cart;
  res.render("links/list", { links, carrito });
};

res.deleteLink = async (req, res) => {
  const { idProduct } = req.params;
  try {
    await pool.query("DELETE FROM product WHERE idProduct = ?", [idProduct]);
    res.status(200).send("Se elimino el producto");
  } catch (error) {
    res.status(404);
    console.log(error);
  }
};

res.renderEditLink = async (req, res) => {
  const { idProduct, idCategory } = req.params;
  const category = await pool.query("SELECT * FROM category");
  const link = await pool.query(
    "SELECT C.name AS category, P.idProduct, P.name, P.description, P.price, P.idCategory, P.url_image,P.idImage,P.qty,P.created_at,P.update_at FROM product AS P INNER JOIN category AS C ON P.idCategory = C.idCategory WHERE idProduct = ?",
    [idProduct]
  );
  const carrito = req.session.cart;
  res.render("links/edit", { link: link[0], category, carrito });
};

res.editLink = async (req, res) => {
  const { idProduct } = req.params;
  const { name, description, price, idCategory, qty } = req.body;

  if (req.file) {
    const { filename, originalname, mimetype, size, path } = req.file;
    const product = await pool.query(
      "SELECT * from product WHERE idProduct = ?",
      [idProduct]
    );
    const { idImage, url_image } = product[0];
    if (idImage) {
      await unlink(paths.resolve("./src/public" + url_image));
      const newImage = {
        filename,
        originalname,
        mimetype,
        size,
        path: "/img/upload/" + filename,
      };
      await pool.query("UPDATE image set ? WHERE idImage = ?", [
        newImage,
        idImage,
      ]);
    } else {
      const newImage = {
        idImage: filename,
        filename,
        originalname,
        mimetype,
        size,
        path: "/img/upload/" + filename,
      };
      await pool.query("INSERT INTO image set ?", [newImage]);
    }

    const newLink = {
      name,
      price,
      description,
      idCategory,
      qty,
      url_image: "/img/upload/" + filename,
    };

    await pool.query("UPDATE product set ? WHERE idProduct = ?", [
      newLink,
      idProduct,
    ]);

    req.flash("success", "Editado correctamente!");
    res.redirect("/links");
  } else {
    const url = req.body.url_image;
    if (url) {
      const product = await pool.query(
        "SELECT * from product WHERE idProduct = ?",
        [idProduct]
      );
      const { idImage, url_image } = product[0];

      if (existeImagen(idImage)) {
        const { idProduct } = req.params;
        await unlink(paths.resolve("./src/public" + url_image));

        // Borrar la imagen de la base
        await pool.query("DELETE from image WHERE idImage = ?", [idImage]);
        // Actualizar product
        const newLink = {
          name,
          description,
          price,
          idCategory,
          qty,
          url_image: url,
        };
        await pool.query("UPDATE product set ? WHERE idProduct = ?", [
          newLink,
          idProduct,
        ]);
        req.flash("success", "Editado correctamente!");
        res.redirect("/links");
      } else {
        const { idProduct } = req.params;
        const newLink = {
          name,
          description,
          price,
          idCategory,
          qty,
          url_image: url,
        };
        await pool.query("UPDATE product set ? WHERE idProduct = ?", [
          newLink,
          idProduct,
        ]);
        req.flash("success", "Editado correctamente!");
        res.redirect("/links");
      }
    } else {
      const { idProduct } = req.params;
      const newLink = {
        name,
        price,
        description,
        idCategory,
        qty,
      };
      await pool.query("UPDATE product set ? WHERE idProduct = ?", [
        newLink,
        idProduct,
      ]);
      req.flash("success", "Editado correctamente!");
      res.redirect("/links");
    }
  }
};
async function existeImagen(id) {
  const image = await pool.query("SELECT * from Image WHERE idImage = ?", [id]);
  if (image) {
    return true;
  } else {
    return false;
  }
}
module.exports = res;
