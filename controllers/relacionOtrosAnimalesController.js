const RelacionOtrosAnimales = require("../models/RelacionOtrosAnimales");

// Método para agregar una nueva raza
const createRelacionOtrosAnimales = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear la nueva raza directamente
    const nuevaRelacionOtrosAnimales= new RelacionOtrosAnimales({ valor });
    await nuevaRelacionOtrosAnimales.save();

    res.status(201).json(nuevaRelacionOtrosAnimales);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El valor ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todas las razas activas (estado = 1)
const getActiveRelacionConOtrosAnimales = async (req, res) => {
  try {
    const relacionOtrosAnimales = await RelacionOtrosAnimales.find({ estado: 1 }).select("valor estado timestamp");
    res.json(relacionOtrosAnimales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los valores" });
  }
};

// Método para obtener todas las razas (activos e inactivos)
const getAllRelacionOtrosAnimales = async (req, res) => {
  try {
    const relacionOtrosAnimales = await RelacionOtrosAnimales.find().select("valor estado timestamp");
    res.json(relacionOtrosAnimales);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los valores" });
  }
};

module.exports = {
  createRelacionOtrosAnimales,
  getActiveRelacionConOtrosAnimales,
  getAllRelacionOtrosAnimales
};