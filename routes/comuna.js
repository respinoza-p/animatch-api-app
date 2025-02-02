const express = require("express");
const router = express.Router();
const comunaController = require("../controllers/comunaController");

// Rutas para comunas
router.get("/", comunaController.getComunas);
router.post("/", comunaController.createComuna);
router.get("/activas", comunaController.getActiveComunas);

module.exports = router;