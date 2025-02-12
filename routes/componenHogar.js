const express = require("express");
const router = express.Router();
const { createComponenHogar, getEstadosReproductivosActivos } = require("../controllers/componenHogarController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// 🔹 Ruta para agregar un nuevo ComponenHogar (Protegida con JWT)
router.post("/", authJWTMiddleware, createComponenHogar);

// 🔹 Ruta para obtener todos los estados reproductivos activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getEstadosReproductivosActivos);

module.exports = router;