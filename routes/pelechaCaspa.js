const express = require("express");
const router = express.Router();
const {
  createPelechaCaspa,
  getActivePelechaCaspa,
  getAllPelechaCaspa
} = require("../controllers/pelechaCaspaController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createPelechaCaspa);
router.get("/activos", getActivePelechaCaspa);
router.get("/todos", getAllPelechaCaspa);

module.exports = router;