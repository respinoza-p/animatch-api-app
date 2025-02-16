const express = require("express");
const router = express.Router();
const { createVivoEn, getActiveVivoEn } = require("../controllers/vivoEnController");

// Ruta para agregar una nueva respuesta sobre dónde vive la persona
router.post("/", createVivoEn);

// Ruta para obtener todas las respuestas activas
router.get("/activos", getActiveVivoEn);

module.exports = router;