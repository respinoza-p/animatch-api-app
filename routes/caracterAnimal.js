const express = require("express");
const router = express.Router();
const { createCaracterAnimal, getActiveCaracteresAnimal } = require("../controllers/caracterAnimalController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo carácter de animal (Protegida con JWT)
router.post("/", authJWTMiddleware, createCaracterAnimal);

// Ruta para obtener todos los caracteres de animales activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveCaracteresAnimal);

module.exports = router;