const TipoViviendaAnimal = require("../models/TipoViviendaAnimal");

// Método para agregar un nuevo tipo de vivienda animal
const createTipoViviendaAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear el nuevo tipo de vivienda directamente
    const nuevoTipoVivienda = new TipoViviendaAnimal({ valor });
    await nuevoTipoVivienda.save();

    res.status(201).json(nuevoTipoVivienda);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El tipo de vivienda ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todos los tipos de vivienda activos (estado = 1)
const getActiveTiposViviendaAnimal = async (req, res) => {
  try {
    const tiposVivienda = await TipoViviendaAnimal.find({ estado: 1 }).select("valor estado timestamp");
    res.json(tiposVivienda);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos de vivienda" });
  }
};

// Método para obtener todos los tipos de vivienda (activos e inactivos)
const getAllTiposViviendaAnimal = async (req, res) => {
  try {
    const tiposVivienda = await TipoViviendaAnimal.find().select("valor estado timestamp");
    res.json(tiposVivienda);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos de vivienda" });
  }
};

module.exports = {
  createTipoViviendaAnimal,
  getActiveTiposViviendaAnimal,
  getAllTiposViviendaAnimal
};