const express = require("express");
const router = express.Router();
const { createTipoEntrenamiento, getActiveTiposEntrenamiento } = require("../controllers/tipoEntrenamientoController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo tipo de entrenamiento (Protegida con JWT)
router.post("/", authJWTMiddleware, createTipoEntrenamiento);

// Ruta para obtener todos los tipos de entrenamiento activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveTiposEntrenamiento);

module.exports = router;