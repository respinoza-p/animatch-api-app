const PorqueDeseaAdoptar = require("../models/PorqueDeseaAdoptar");

// Método para agregar un nuevo tipo de entrenamiento
const createPorqueDeseaAdoptar= async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de entrenamiento con el mismo valor
    const porqueDeseaAdoptar = await PorqueDeseaAdoptar.findOne({ valor });
    if (porqueDeseaAdoptar) {
      return res.status(400).json({ message: "Pregunta ya existe" });
    }

    // Crear el nuevo tipo de entrenamiento
    const nuevoPorqueDeseaAdoptar = new PorqueDeseaAdoptar({ valor });
    await nuevoPorqueDeseaAdoptar.save();

    res.status(201).json(nuevoPorqueDeseaAdoptar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todas las preguntas activas (estado = 1)
const getActivePorqueDeseaAdoptar= async (req, res) => {
  try {
    const tipos = await PorqueDeseaAdoptar.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPorqueDeseaAdoptar,
  getActivePorqueDeseaAdoptar
};