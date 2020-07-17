const express = require("express");
const router = express.Router();

const {
  renderIndex,
  renderDescription,
  obtenerProductoPorId,
} = require("../controller/index.controller");

router.get("/", renderIndex);

router.get("/description", renderDescription);
router.get("/description/:id", obtenerProductoPorId);
//  router.get('/',indexc);

module.exports = router;
