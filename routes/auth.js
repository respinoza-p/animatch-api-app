const express = require("express");
const router = express.Router();
const { getToken } = require("../controllers/authController");

// Ruta para obtener un token dinámico
router.post("/token", getToken);

module.exports = router;