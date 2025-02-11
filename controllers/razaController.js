const Raza = require("../models/Raza");

// Método para agregar una nueva raza
const createRaza = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear la nueva raza directamente
    const nuevaRaza = new Raza({ valor });
    await nuevaRaza.save();

    res.status(201).json(nuevaRaza);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "La raza ya existe" });
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
const getActiveRazas = async (req, res) => {
  try {
    const razas = await Raza.find({ estado: 1 }).select("valor estado timestamp");
    res.json(razas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las razas" });
  }
};

// Método para obtener todas las razas (activos e inactivos)
const getAllRazas = async (req, res) => {
  try {
    const razas = await Raza.find().select("valor estado timestamp");
    res.json(razas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las razas" });
  }
};

module.exports = {
  createRaza,
  getActiveRazas,
  getAllRazas
};