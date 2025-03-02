const express = require("express");
const router = express.Router();
const { createComponenHogar, getEstadosReproductivosActivos } = require("../controllers/componenHogarController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// 🔹 Ruta para agregar un nuevo ComponenHogar (Protegida con JWT)
router.post("/", authJWTMiddleware, createComponenHogar);

// 🔹 Ruta para obtener los datos de componen hogar activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getComponenHogarActivos);

module.exports = router;