const TipoCuidados = require("../models/TipoCuidados");

// Método para agregar un nuevo tipo de cuidado
const createTipoCuidados = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de cuidado con el mismo valor
    const existeTipo = await TipoCuidados.findOne({ valor });
    if (existeTipo) {
      return res.status(400).json({ message: "El tipo de cuidado ya existe" });
    }

    // Crear el nuevo tipo de cuidado
    const nuevoTipoCuidados = new TipoCuidados({ valor });
    await nuevoTipoCuidados.save();

    res.status(201).json(nuevoTipoCuidados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de cuidado activos (estado = 1)
const getActiveTiposCuidados = async (req, res) => {
  try {
    const tipos = await TipoCuidados.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTipoCuidados,
  getActiveTiposCuidados
};