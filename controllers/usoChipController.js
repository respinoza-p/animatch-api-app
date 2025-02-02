const UsoChip = require("../models/UsoChip");

// Método para agregar un nuevo estado de uso de chip
const createUsoChip = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un estado con el mismo valor
    const existeEstado = await UsoChip.findOne({ valor });
    if (existeEstado) {
      return res.status(400).json({ message: "El estado de uso de chip ya existe" });
    }

    // Crear el nuevo estado de uso de chip
    const nuevoUsoChip = new UsoChip({ valor });
    await nuevoUsoChip.save();

    res.status(201).json(nuevoUsoChip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los estados de uso de chip activos (estado = 1)
const getActiveUsoChip = async (req, res) => {
  try {
    const estados = await UsoChip.find({ estado: 1 }).select("valor estado");
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUsoChip,
  getActiveUsoChip
};