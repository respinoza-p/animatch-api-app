const express = require("express");
const router = express.Router();
const { createTamanioAnimal, getActiveTamaniosAnimal } = require("../controllers/tamanioAnimalController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo tamaño de animal (Protegida con JWT)
router.post("/", authJWTMiddleware, createTamanioAnimal);

// Ruta para obtener todos los tamaños de animales activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveTamaniosAnimal);

module.exports = router;