const PeriodoVacaciones = require("../models/PeriodoVacaciones");

// 📌 Método para agregar una nueva opción de qué hacer con el animal en vacaciones
const createPeriodoVacaciones = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await PeriodoVacaciones.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoPeriodoVacaciones = new PeriodoVacaciones({ valor });
    await nuevoPeriodoVacaciones.save();

    res.status(201).json(nuevoPeriodoVacaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActivePeriodoVacaciones = async (req, res) => {
  try {
    const activos = await PeriodoVacaciones.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPeriodoVacaciones,
  getActivePeriodoVacaciones
};