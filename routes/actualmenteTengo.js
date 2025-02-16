const express = require("express");
const router = express.Router();
const { createActualmenteTengo, getActiveActualmenteTengo } = require("../controllers/actualmenteTengoController");

// Ruta para agregar un nuevo registro
router.post("/", createActualmenteTengo);

// Ruta para obtener todas las opciones activas
router.get("/activos", getActiveActualmenteTengo);

module.exports = router;