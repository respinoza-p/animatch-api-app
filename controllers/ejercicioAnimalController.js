const EjercicioAnimal = require("../models/EjercicioAnimal");

// Método para agregar un nuevo ejercicio animal
const createEjercicioAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Crear el nuevo ejercicio directamente
    const nuevoEjercicio = new EjercicioAnimal({ valor });
    await nuevoEjercicio.save();

    res.status(201).json(nuevoEjercicio);
  } catch (error) {
    // Manejo de error de índice duplicado
    if (error.code === 11000) {
      return res.status(400).json({ message: "El ejercicio animal ya existe" });
    }

    // Manejo de errores de validación de Mongoose
    if (error.name === "ValidationError") {
      const mensajes = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: mensajes });
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Método para obtener todos los ejercicios animales activos (estado = 1)
const getActiveEjerciciosAnimales = async (req, res) => {
  try {
    const ejercicios = await EjercicioAnimal.find({ estado: 1 }).select("valor estado timestamp");
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los ejercicios animales" });
  }
};

// Método para obtener todos los ejercicios animales (activos e inactivos)
const getAllEjerciciosAnimales = async (req, res) => {
  try {
    const ejercicios = await EjercicioAnimal.find().select("valor estado timestamp");
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los ejercicios animales" });
  }
};

module.exports = {
  createEjercicioAnimal,
  getActiveEjerciciosAnimales,
  getAllEjerciciosAnimales
};