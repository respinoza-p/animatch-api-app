const express = require("express");
const router = express.Router();
const {
  createPorqueDeseaAdoptar,
  getActivePorqueDeseaAdoptar
} = require("../controllers/porqueDeseaAdoptarController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createPorqueDeseaAdoptar);
router.get("/activos", getActivePorqueDeseaAdoptar);

module.exports = router;