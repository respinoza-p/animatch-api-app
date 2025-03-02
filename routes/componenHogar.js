const express = require("express");
const router = express.Router();
const {
    createComponenHogar,
    getComponenHogarActivos
} = require("../controllers/componenHogarController");
const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Rutas protegidas
router.post("/", createComponenHogar);
router.get("/activos", getComponenHogarActivos);

module.exports = router;