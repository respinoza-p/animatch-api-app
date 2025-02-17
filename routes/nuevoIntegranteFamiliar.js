const express = require("express");
const router = express.Router();
const { createNuevoIntegranteFamiliar, getActiveNuevoIntegranteFamiliar } = require("../controllers/nuevoIntegranteFamiliarController");

// Ruta para agregar una nueva opción sobre la llegada de un nuevo integrante familiar
router.post("/", createNuevoIntegranteFamiliar);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveNuevoIntegranteFamiliar);

module.exports = router;