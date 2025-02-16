const express = require("express");
const router = express.Router();
const { createPresupuestoMensual, getActivePresupuestoMensual } = require("../controllers/presupuestoMensualController");

// Ruta para agregar un nuevo rango de presupuesto mensual
router.post("/", createPresupuestoMensual);

// Ruta para obtener todos los rangos de presupuesto activos
router.get("/activos", getActivePresupuestoMensual);

module.exports = router;