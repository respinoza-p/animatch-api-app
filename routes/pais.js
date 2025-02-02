const express = require("express");
const router = express.Router();
const paisController = require("../controllers/paisController");
const authJWTMiddleware = require("../middlewares/authJWT");

router.get("/", authJWTMiddleware, paisController.getPaises);

router.post("/", authJWTMiddleware, paisController.createPais);

module.exports = router;