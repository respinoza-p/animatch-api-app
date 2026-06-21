const express = require("express");
const router = express.Router();
const { createRegistroAdoptante, getRegistroAdoptante } = require("../controllers/registroAdoptanteController");

const authJWTMiddleware = require("../middlewares/authJWT"); // Protección con JWT

// Middleware de autenticación para todas las rutas
router.use(authJWTMiddleware);

/**
 * @swagger
 * /api/humano/registroAdoptante:
 *   post:
 *     summary: Crear o actualizar un registro de adoptante
 *     tags: [Adoptante]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *             properties:
 *               correo:
 *                 type: string
 *                 example: espinozaplaza.rodrigo@gmail.com
 *               componenHogar:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b00
 *               fraseIdentifica:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b01
 *               porqueDeseaAdoptar:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b02
 *               alergiaEnfermedad:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b03
 *               haTenidoAnimales:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b04
 *               actualmenteTengo:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b05
 *               tamanioAnimal:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b06
 *               edadAnimal:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b07
 *               opinionEsteriliza:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b08
 *               dispuestoAdoptar:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b09
 *               vivoEn:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b10
 *               presupuestoMensual:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b11
 *               paseosAnimal:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b12
 *               tiempoSoledadAnimal:
 *                 type: string
 *                 example: 65c345a8df233b2c12a84b13
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente.
 *       201:
 *         description: Registro creado exitosamente.
 *       400:
 *         description: Solicitud incorrecta (ej. falta correo).
 *       401:
 *         description: Token no proporcionado o no válido.
 */
router.post("/", createRegistroAdoptante);

/**
 * @swagger
 * /api/humano/registroAdoptante/{correo}:
 *   get:
 *     summary: Obtener el registro de un adoptante por su correo
 *     tags: [Adoptante]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *         example: espinozaplaza.rodrigo@gmail.com
 *     responses:
 *       200:
 *         description: Retorna la información detallada del adoptante con sus referencias populadas.
 *       401:
 *         description: Token no proporcionado o no válido.
 *       404:
 *         description: Adoptante no encontrado.
 */
router.get("/:correo", getRegistroAdoptante);

module.exports = router;