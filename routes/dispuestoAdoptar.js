const express = require("express");
const router = express.Router();
const { createDispuestoAdoptar, getActiveDispuestoAdoptar } = require("../controllers/dispuestoAdoptarController");

// Ruta para agregar una nueva respuesta sobre disposición a adoptar
router.post("/", createDispuestoAdoptar);

// Ruta para obtener todas las respuestas activas
router.get("/activos", getActiveDispuestoAdoptar);

module.exports = router;