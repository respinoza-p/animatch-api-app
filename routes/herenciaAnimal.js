const express = require("express");
const router = express.Router();
const { createHerenciaAnimal, getActiveHerenciaAnimal } = require("../controllers/herenciaAnimalController");

// Ruta para agregar una nueva opción sobre la herencia del animal
router.post("/", createHerenciaAnimal);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveHerenciaAnimal);

module.exports = router;