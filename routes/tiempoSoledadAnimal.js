const express = require("express");
const router = express.Router();
const { createTiempoSoledadAnimal, getActiveTiempoSoledadAnimal } = require("../controllers/tiempoSoledadAnimalController");

// Ruta para agregar una nueva opción de tiempo de soledad del animal
router.post("/", createTiempoSoledadAnimal);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveTiempoSoledadAnimal);

module.exports = router;