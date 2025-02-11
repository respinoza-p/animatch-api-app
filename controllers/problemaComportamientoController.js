const ProblemaComportamiento = require("../models/ProblemaComportamiento");

// Método para agregar un nuevo problema de comportamiento
const createProblemaComportamiento = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear el nuevo problema directamente
    const nuevoProblema = new ProblemaComportamiento({ valor });
    await nuevoProblema.save();

    res.status(201).json(nuevoProblema);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El problema de comportamiento ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todos los problemas de comportamiento activos (estado = 1)
const getActiveProblemasComportamiento = async (req, res) => {
  try {
    const problemas = await ProblemaComportamiento.find({ estado: 1 }).select("valor estado timestamp");
    res.json(problemas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los problemas de comportamiento" });
  }
};

// Método para obtener todos los problemas de comportamiento (activos e inactivos)
const getAllProblemasComportamiento = async (req, res) => {
  try {
    const problemas = await ProblemaComportamiento.find().select("valor estado timestamp");
    res.json(problemas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los problemas de comportamiento" });
  }
};

module.exports = {
  createProblemaComportamiento,
  getActiveProblemasComportamiento,
  getAllProblemasComportamiento
};