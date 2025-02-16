const express = require("express");
const router = express.Router();
const { createEstanDeAcuerdoAdopcion, getActiveEstanDeAcuerdoAdopcion } = require("../controllers/estanDeAcuerdoAdopcionController");

// Ruta para agregar una nueva respuesta sobre si están de acuerdo con la adopción
router.post("/", createEstanDeAcuerdoAdopcion);

// Ruta para obtener todas las respuestas activas
router.get("/activos", getActiveEstanDeAcuerdoAdopcion);

module.exports = router;