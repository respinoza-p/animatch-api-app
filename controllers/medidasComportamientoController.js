const MedidasComportamiento = require("../models/MedidasComportamiento");

// 📌 Método para agregar una nueva opción de medidas de comportamiento
const createMedidasComportamiento = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await MedidasComportamiento.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevaMedidasComportamiento = new MedidasComportamiento({ valor });
    await nuevaMedidasComportamiento.save();

    res.status(201).json(nuevaMedidasComportamiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveMedidasComportamiento = async (req, res) => {
  try {
    const activos = await MedidasComportamiento.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMedidasComportamiento,
  getActiveMedidasComportamiento
};