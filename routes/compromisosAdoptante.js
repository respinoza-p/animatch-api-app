const express = require("express");
const router = express.Router();
const { createCompromisosAdoptante, getActiveCompromisosAdoptante } = require("../controllers/compromisosAdoptanteController");

// Ruta para agregar una nueva opción de compromiso del adoptante
router.post("/", createCompromisosAdoptante);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveCompromisosAdoptante);

module.exports = router;