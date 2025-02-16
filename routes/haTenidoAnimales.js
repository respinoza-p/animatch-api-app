const express = require("express");
const router = express.Router();
const { createHaTenidoAnimales, getActiveHaTenidoAnimales } = require("../controllers/haTenidoAnimalesController");

// Ruta para agregar un nuevo registro
router.post("/", createHaTenidoAnimales);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveHaTenidoAnimales);

module.exports = router;