const express = require("express");
const router = express.Router();
const comunaController = require("../controllers/comunaController");
const authJWTMiddleware = require("../middlewares/authJWT");

// Rutas para comunas
router.get("/", authJWTMiddleware, comunaController.getComunas);
router.post("/", authJWTMiddleware, comunaController.createComuna);
router.get("/activas", authJWTMiddleware, comunaController.getActiveComunas);

module.exports = router;