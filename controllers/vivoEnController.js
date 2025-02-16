const VivoEn = require("../models/VivoEn");

// 📌 Método para agregar una nueva respuesta sobre dónde vive la persona
const createVivoEn = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await VivoEn.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoVivoEn = new VivoEn({ valor });
    await nuevoVivoEn.save();

    res.status(201).json(nuevoVivoEn);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las respuestas activas (estado = 1)
const getActiveVivoEn = async (req, res) => {
  try {
    const activas = await VivoEn.find({ estado: 1 }).select("valor estado");
    res.json(activas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createVivoEn,
  getActiveVivoEn
};