const express = require("express");
const router = express.Router();
const { createComoPaseaAnimal, getActiveComoPaseaAnimal } = require("../controllers/comoPaseaAnimalController");

// Ruta para agregar una nueva opción de cómo pasea al animal
router.post("/", createComoPaseaAnimal);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveComoPaseaAnimal);

module.exports = router;