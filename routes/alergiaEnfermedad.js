const express = require("express");
const router = express.Router();
const {
  createAlergiaEnfermedad,
  getActiveAlergiaEnfermedad
} = require("../controllers/alergiaEnfermedadController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createAlergiaEnfermedad);
router.get("/activos", getActiveAlergiaEnfermedad);

module.exports = router;