const express = require("express");
const router = express.Router();
const { createContactoConRescatistas, getActiveContactoConRescatistas } = require("../controllers/contactoConRescatistasController");

// Ruta para agregar una nueva opción sobre contacto con rescatistas
router.post("/", createContactoConRescatistas);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveContactoConRescatistas);

module.exports = router;