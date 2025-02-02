const express = require("express");
const router = express.Router();
const { createEstadoVacuna, getActiveEstadosVacuna } = require("../controllers/estadoVacunaController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo estado de vacuna (Protegida con JWT)
router.post("/", authJWTMiddleware, createEstadoVacuna);

// Ruta para obtener todos los estados de vacunas activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveEstadosVacuna);

module.exports = router;