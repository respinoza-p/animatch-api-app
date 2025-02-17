const express = require("express");
const router = express.Router();
const { createPropiedadVivienda, getActivePropiedadVivienda } = require("../controllers/propiedadViviendaController");

// Ruta para agregar una nueva opción de propiedad de la vivienda
router.post("/", createPropiedadVivienda);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActivePropiedadVivienda);

module.exports = router;