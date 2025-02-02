const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authJWTMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });
  }

  try {
    // Extraer token del formato "Bearer <TOKEN>"
    const jwtToken = token.replace("Bearer ", "");

    // Verificar el token con la clave secreta
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    // Agregar datos del usuario al request
    req.user = decoded;
    
    next(); // Continuar con la ejecución de la ruta
  } catch (error) {
    res.status(401).json({ message: "Token no válido" });
  }
};

module.exports = authJWTMiddleware;