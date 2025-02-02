const express = require("express");
const router = express.Router();
const { createTipoAlimentacion, getActiveTiposAlimentacion } = require("../controllers/tipoAlimentacionController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo tipo de alimentación (Protegida con JWT)
router.post("/", authJWTMiddleware, createTipoAlimentacion);

// Ruta para obtener todos los tipos de alimentación activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveTiposAlimentacion);

module.exports = router;