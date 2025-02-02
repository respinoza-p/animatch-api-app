const express = require("express");
const router = express.Router();
const { createTipoCuidados, getActiveTiposCuidados } = require("../controllers/tipoCuidadosController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo tipo de cuidado (Protegida con JWT)
router.post("/", authJWTMiddleware, createTipoCuidados);

// Ruta para obtener todos los tipos de cuidado activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveTiposCuidados);

module.exports = router;