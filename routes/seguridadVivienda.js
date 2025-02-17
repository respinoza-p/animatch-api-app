const express = require("express");
const router = express.Router();
const { createSeguridadVivienda, getActiveSeguridadVivienda } = require("../controllers/seguridadViviendaController");

// Ruta para agregar una nueva opción de seguridad en la vivienda
router.post("/", createSeguridadVivienda);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveSeguridadVivienda);

module.exports = router;