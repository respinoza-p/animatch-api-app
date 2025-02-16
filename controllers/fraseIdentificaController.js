const FraseIdentifica = require("../models/FraseIdentifica");

// Método para agregar un nuevo tipo de entrenamiento
const createFraseIdentifica= async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de entrenamiento con el mismo valor
    const existeFrase = await FraseIdentifica.findOne({ valor });
    if (existeFrase) {
      return res.status(400).json({ message: "Frase Identifica ya existe" });
    }

    // Crear el nuevo tipo de entrenamiento
    const nuevoFraseIdentifica = new FraseIdentifica({ valor });
    await nuevoFraseIdentifica.save();

    res.status(201).json(nuevoFraseIdentifica);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de entrenamiento activos (estado = 1)
const getActiveFraseIdentifica= async (req, res) => {
  try {
    const tipos = await FraseIdentifica.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createFraseIdentifica,
  getActiveFraseIdentifica
};