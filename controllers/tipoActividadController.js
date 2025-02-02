const TipoActividad = require("../models/TipoActividad");

// Método para agregar un nuevo tipo de actividad
const createTipoActividad = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de actividad con el mismo valor
    const existeTipo = await TipoActividad.findOne({ valor });
    if (existeTipo) {
      return res.status(400).json({ message: "El tipo de actividad ya existe" });
    }

    // Crear el nuevo tipo de actividad
    const nuevoTipoActividad = new TipoActividad({ valor });
    await nuevoTipoActividad.save();

    res.status(201).json(nuevoTipoActividad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de actividad activos (estado = 1)
const getActiveTiposActividad = async (req, res) => {
  try {
    const tipos = await TipoActividad.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTipoActividad,
  getActiveTiposActividad
};