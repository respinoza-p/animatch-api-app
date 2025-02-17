const express = require("express");
const router = express.Router();
const { createRecursosUrgencia, getActiveRecursosUrgencia } = require("../controllers/recursosUrgenciaController");

// Ruta para agregar una nueva opción sobre recursos de urgencia
router.post("/", createRecursosUrgencia);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveRecursosUrgencia);

module.exports = router;