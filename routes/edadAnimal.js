const express = require("express");
const router = express.Router();
const { createEdadAnimal, getActiveEdadAnimal } = require("../controllers/edadAnimalController");

// Ruta para agregar un nuevo registro
router.post("/", createEdadAnimal);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveEdadAnimal);

module.exports = router;