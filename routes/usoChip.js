const express = require("express");
const router = express.Router();
const { createUsoChip, getActiveUsoChip } = require("../controllers/usoChipController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Ruta para agregar un nuevo estado de uso de chip (Protegida con JWT)
router.post("/", authJWTMiddleware, createUsoChip);

// Ruta para obtener todos los estados de uso de chip activos (Protegida con JWT)
router.get("/activos", authJWTMiddleware, getActiveUsoChip);

module.exports = router;