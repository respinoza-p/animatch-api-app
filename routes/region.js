const express = require("express");
const router = express.Router();
const regionController = require("../controllers/regionController");
const authJWTMiddleware = require("../middlewares/authJWT");

// Verifica que el controlador esté correctamente importado
if (!regionController || !regionController.getRegiones || !regionController.createRegion) {
  throw new Error("El controlador regionController no se ha importado correctamente.");
}

// Definir rutas
router.get("/", authJWTMiddleware, regionController.getRegiones);
router.post("/", authJWTMiddleware, regionController.createRegion);
router.get("/activas", authJWTMiddleware, regionController.getActiveRegiones);

module.exports = router;