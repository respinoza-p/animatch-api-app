const RecursosUrgencia = require("../models/RecursosUrgencia");

// 📌 Método para agregar una nueva opción sobre recursos de urgencia
const createRecursosUrgencia = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await RecursosUrgencia.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoRecursosUrgencia = new RecursosUrgencia({ valor });
    await nuevoRecursosUrgencia.save();

    res.status(201).json(nuevoRecursosUrgencia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveRecursosUrgencia = async (req, res) => {
  try {
    const activos = await RecursosUrgencia.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRecursosUrgencia,
  getActiveRecursosUrgencia
};