const express = require("express");
const router = express.Router();
const { createOpinionEsteriliza, getActiveOpinionEsteriliza } = require("../controllers/opinionEsterilizaController");

// Ruta para agregar una nueva opinión sobre esterilización
router.post("/", createOpinionEsteriliza);

// Ruta para obtener todas las opiniones activas
router.get("/activos", getActiveOpinionEsteriliza);

module.exports = router;