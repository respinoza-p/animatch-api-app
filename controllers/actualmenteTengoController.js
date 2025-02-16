const ActualmenteTengo = require("../models/ActualmenteTengo");

// 📌 Método para agregar una nueva opción de "Actualmente Tengo"
const createActualmenteTengo = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await ActualmenteTengo.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoActualmenteTengo = new ActualmenteTengo({ valor });
    await nuevoActualmenteTengo.save();

    res.status(201).json(nuevoActualmenteTengo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveActualmenteTengo = async (req, res) => {
  try {
    const activos = await ActualmenteTengo.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createActualmenteTengo,
  getActiveActualmenteTengo
};