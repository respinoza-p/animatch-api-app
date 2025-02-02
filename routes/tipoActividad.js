const express = require("express");
const router = express.Router();
const { createTipoActividad, getActiveTiposActividad } = require("../controllers/tipoActividadController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo tipo de actividad (Protegida con JWT)
router.post("/", authJWTMiddleware, createTipoActividad);

// Ruta para obtener todos los tipos de actividad activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveTiposActividad);

module.exports = router;