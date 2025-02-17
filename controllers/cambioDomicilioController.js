const CambioDomicilio = require("../models/CambioDomicilio");

// 📌 Método para agregar una nueva opción sobre qué hacer con el animal en caso de cambio de domicilio
const createCambioDomicilio = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await CambioDomicilio.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoCambioDomicilio = new CambioDomicilio({ valor });
    await nuevoCambioDomicilio.save();

    res.status(201).json(nuevoCambioDomicilio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveCambioDomicilio = async (req, res) => {
  try {
    const activos = await CambioDomicilio.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCambioDomicilio,
  getActiveCambioDomicilio
};