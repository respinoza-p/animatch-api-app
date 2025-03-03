const express = require("express");
const router = express.Router();
const { createRegistroAdoptante, getRegistroAdoptante } = require("../controllers/registroAdoptanteController");

const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Ruta para crear o actualizar el registro del adoptante
router.post("/", createRegistroAdoptante);

// Ruta para recuperar el registro del adoptante usando el correo como parámetro
router.get("/:correo", getRegistroAdoptante);

module.exports = router;