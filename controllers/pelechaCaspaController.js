const PelechaCaspa = require("../models/PelechaCaspa");

// Método para agregar un nuevo valor de pelecha/caspa
const createPelechaCaspa = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear el nuevo registro directamente
    const nuevaPelechaCaspa = new PelechaCaspa({ valor });
    await nuevaPelechaCaspa.save();

    res.status(201).json(nuevaPelechaCaspa);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El valor de pelecha/caspa ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todos los valores activos (estado = 1)
const getActivePelechaCaspa = async (req, res) => {
  try {
    const pelechaCaspa = await PelechaCaspa.find({ estado: 1 }).select("valor estado timestamp");
    res.json(pelechaCaspa);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los valores de pelecha/caspa" });
  }
};

// Método para obtener todos los valores de pelecha/caspa (activos e inactivos)
const getAllPelechaCaspa = async (req, res) => {
  try {
    const pelechaCaspa = await PelechaCaspa.find().select("valor estado timestamp");
    res.json(pelechaCaspa);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los valores de pelecha/caspa" });
  }
};

module.exports = {
  createPelechaCaspa,
  getActivePelechaCaspa,
  getAllPelechaCaspa
};