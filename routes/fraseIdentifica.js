const express = require("express");
const router = express.Router();
const {
  createFraseIdentifica,
  getActiveFraseIdentifica
} = require("../controllers/fraseIdentificaController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createFraseIdentifica);
router.get("/activos", getActiveFraseIdentifica);

module.exports = router;