const EstadoVacuna = require("../models/EstadoVacuna");

// Método para agregar un nuevo estado de vacuna
const createEstadoVacuna = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un estado con el mismo valor
    const existeEstado = await EstadoVacuna.findOne({ valor });
    if (existeEstado) {
      return res.status(400).json({ message: "El estado de vacuna ya existe" });
    }

    // Crear el nuevo estado de vacuna
    const nuevoEstadoVacuna = new EstadoVacuna({ valor });
    await nuevoEstadoVacuna.save();

    res.status(201).json(nuevoEstadoVacuna);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los estados de vacunas activos (estado = 1)
const getActiveEstadosVacuna = async (req, res) => {
  try {
    const estados = await EstadoVacuna.find({ estado: 1 }).select("valor estado");
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEstadoVacuna,
  getActiveEstadosVacuna
};