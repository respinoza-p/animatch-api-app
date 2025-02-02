const express = require("express");
const router = express.Router();
const regionController = require("../controllers/regionController");

// Verifica que el controlador esté correctamente importado
if (!regionController || !regionController.getRegiones || !regionController.createRegion) {
  throw new Error("El controlador regionController no se ha importado correctamente.");
}

// Definir rutas
router.get("/", regionController.getRegiones);
router.post("/", regionController.createRegion);
router.get("/activas", regionController.getActiveRegiones);

module.exports = router;