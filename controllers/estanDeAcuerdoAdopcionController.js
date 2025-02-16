const EstanDeAcuerdoAdopcion = require("../models/EstanDeAcuerdoAdopcion");

// 📌 Método para agregar una nueva respuesta sobre si están de acuerdo con la adopción
const createEstanDeAcuerdoAdopcion = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await EstanDeAcuerdoAdopcion.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoEstanDeAcuerdoAdopcion = new EstanDeAcuerdoAdopcion({ valor });
    await nuevoEstanDeAcuerdoAdopcion.save();

    res.status(201).json(nuevoEstanDeAcuerdoAdopcion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las respuestas activas (estado = 1)
const getActiveEstanDeAcuerdoAdopcion = async (req, res) => {
  try {
    const activos = await EstanDeAcuerdoAdopcion.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEstanDeAcuerdoAdopcion,
  getActiveEstanDeAcuerdoAdopcion
};