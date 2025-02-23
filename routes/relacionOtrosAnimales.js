const express = require("express");
const router = express.Router();
const {
  createRelacionOtrosAnimales,
  getActiveRelacionConOtrosAnimales,
  getAllRelacionOtrosAnimales
} = require("../controllers/relacionOtrosAnimalesController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createRelacionOtrosAnimales);
router.get("/activos", getActiveRelacionConOtrosAnimales);
router.get("/todos", getAllRelacionOtrosAnimales);

module.exports = router;