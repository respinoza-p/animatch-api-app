const express = require("express");
const router = express.Router();
const { createPaseosAnimal, getActivePaseosAnimal } = require("../controllers/paseosAnimalController");

// Ruta para agregar una nueva opción de paseos de animales
router.post("/", createPaseosAnimal);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActivePaseosAnimal);

module.exports = router;