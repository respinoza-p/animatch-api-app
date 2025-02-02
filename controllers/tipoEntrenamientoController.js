const TipoEntrenamiento = require("../models/TipoEntrenamiento");

// Método para agregar un nuevo tipo de entrenamiento
const createTipoEntrenamiento = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de entrenamiento con el mismo valor
    const existeTipo = await TipoEntrenamiento.findOne({ valor });
    if (existeTipo) {
      return res.status(400).json({ message: "El tipo de entrenamiento ya existe" });
    }

    // Crear el nuevo tipo de entrenamiento
    const nuevoTipoEntrenamiento = new TipoEntrenamiento({ valor });
    await nuevoTipoEntrenamiento.save();

    res.status(201).json(nuevoTipoEntrenamiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de entrenamiento activos (estado = 1)
const getActiveTiposEntrenamiento = async (req, res) => {
  try {
    const tipos = await TipoEntrenamiento.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTipoEntrenamiento,
  getActiveTiposEntrenamiento
};