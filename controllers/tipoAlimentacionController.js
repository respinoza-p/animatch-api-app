const TipoAlimentacion = require("../models/TipoAlimentacion");

// Método para agregar un nuevo tipo de alimentación
const createTipoAlimentacion = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de alimentación con el mismo valor
    const existeTipo = await TipoAlimentacion.findOne({ valor });
    if (existeTipo) {
      return res.status(400).json({ message: "El tipo de alimentación ya existe" });
    }

    // Crear el nuevo tipo de alimentación
    const nuevoTipoAlimentacion = new TipoAlimentacion({ valor });
    await nuevoTipoAlimentacion.save();

    res.status(201).json(nuevoTipoAlimentacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de alimentación activos (estado = 1)
const getActiveTiposAlimentacion = async (req, res) => {
  try {
    const tipos = await TipoAlimentacion.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTipoAlimentacion,
  getActiveTiposAlimentacion
};