const express = require("express");
const router = express.Router();
const { createPeriodoVacaciones, getActivePeriodoVacaciones } = require("../controllers/periodoVacacionesController");

// Ruta para agregar una nueva opción sobre qué hacer con el animal en vacaciones
router.post("/", createPeriodoVacaciones);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActivePeriodoVacaciones);

module.exports = router;