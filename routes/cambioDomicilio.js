const express = require("express");
const router = express.Router();
const { createCambioDomicilio, getActiveCambioDomicilio } = require("../controllers/cambioDomicilioController");

// Ruta para agregar una nueva opción sobre qué hacer con el animal en caso de cambio de domicilio
router.post("/", createCambioDomicilio);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveCambioDomicilio);

module.exports = router;