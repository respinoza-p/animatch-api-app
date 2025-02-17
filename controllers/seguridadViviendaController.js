const SeguridadVivienda = require("../models/SeguridadVivienda");

// 📌 Método para agregar una nueva opción de seguridad en la vivienda
const createSeguridadVivienda = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await SeguridadVivienda.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevaSeguridadVivienda = new SeguridadVivienda({ valor });
    await nuevaSeguridadVivienda.save();

    res.status(201).json(nuevaSeguridadVivienda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveSeguridadVivienda = async (req, res) => {
  try {
    const activos = await SeguridadVivienda.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSeguridadVivienda,
  getActiveSeguridadVivienda
};