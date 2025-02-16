const DispuestoAdoptar = require("../models/DispuestoAdoptar");

// 📌 Método para agregar una nueva respuesta sobre disposición a adoptar
const createDispuestoAdoptar = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await DispuestoAdoptar.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Esta respuesta ya existe" });
    }

    // Crear un nuevo registro
    const nuevoDispuestoAdoptar = new DispuestoAdoptar({ valor });
    await nuevoDispuestoAdoptar.save();

    res.status(201).json(nuevoDispuestoAdoptar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las respuestas activas (estado = 1)
const getActiveDispuestoAdoptar = async (req, res) => {
  try {
    const activas = await DispuestoAdoptar.find({ estado: 1 }).select("valor estado");
    res.json(activas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDispuestoAdoptar,
  getActiveDispuestoAdoptar
};