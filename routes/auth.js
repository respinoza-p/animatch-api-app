const express = require("express");
const router = express.Router();
const { getToken } = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/token:
 *   post:
 *     summary: Obtener token de autenticación
 *     tags: [Autenticación]
 *     description: Retorna un JWT de acceso si las credenciales son válidas.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Autenticación exitosa, retorna el token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas.
 */
router.post("/token", getToken);

module.exports = router;