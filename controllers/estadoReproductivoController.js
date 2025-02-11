
const EstadoReproductivo = require("../models/EstadoReproductivo");

// Método para agregar un nuevo estado reproductivo
const createEstadoReproductivo = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear el nuevo estado reproductivo directamente
    const nuevoEstado = new EstadoReproductivo({ valor });
    await nuevoEstado.save();

    res.status(201).json(nuevoEstado);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El estado reproductivo ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todos los estados reproductivos activos (estado = 1)
const getActiveEstadosReproductivos = async (req, res) => {
  try {
    const estados = await EstadoReproductivo.find({ estado: 1 }).select("valor estado timestamp");
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados reproductivos" });
  }
};

// Método para obtener todos los estados reproductivos (activos e inactivos)
const getAllEstadosReproductivos = async (req, res) => {
  try {
    const estados = await EstadoReproductivo.find().select("valor estado timestamp");
    res.json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados reproductivos" });
  }
};

module.exports = {
  createEstadoReproductivo,
  getActiveEstadosReproductivos,
  getAllEstadosReproductivos
};