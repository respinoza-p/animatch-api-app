const express = require("express");
const router = express.Router();
const { createSexoAnimal, getActiveSexosAnimal } = require("../controllers/sexoAnimalController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo sexo de animal (Protegida con JWT)
router.post("/", authJWTMiddleware, createSexoAnimal);

// Ruta para obtener todos los sexos de animales activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveSexosAnimal);

module.exports = router;