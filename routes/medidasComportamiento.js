const express = require("express");
const router = express.Router();
const { createMedidasComportamiento, getActiveMedidasComportamiento } = require("../controllers/medidasComportamientoController");

// Ruta para agregar una nueva opción de medidas de comportamiento
router.post("/", createMedidasComportamiento);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveMedidasComportamiento);

module.exports = router;