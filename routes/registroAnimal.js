const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createRegistroAnimal, getRegistroAnimalByCorreo } = require("../controllers/registroAnimalController");

const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

// Configurar multer con almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 } // Limitar cada archivo a 3 MB
});

// 🔹 Ruta para crear o actualizar un registro con hasta 3 fotos
router.post("/", upload.array("fotos", 3), createRegistroAnimal);

// 🔹 Nueva ruta para obtener el registro por correo
router.get("/:correo", getRegistroAnimalByCorreo);

module.exports = router;