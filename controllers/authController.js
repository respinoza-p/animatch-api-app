const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.getToken = async (req, res) => {
  const { username, password } = req.body;

  // Validar que las credenciales sean correctas
  if (username !== process.env.AUTH_USERNAME || password !== process.env.AUTH_PASSWORD) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generar el token con vigencia de 2 horas
  const token = jwt.sign(
    { username }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  res.json({ token });
};