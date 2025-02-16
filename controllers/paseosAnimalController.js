const PaseosAnimal = require("../models/PaseosAnimal");

// 📌 Método para agregar una nueva opción de paseos de animales
const createPaseosAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await PaseosAnimal.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoPaseosAnimal = new PaseosAnimal({ valor });
    await nuevoPaseosAnimal.save();

    res.status(201).json(nuevoPaseosAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActivePaseosAnimal = async (req, res) => {
  try {
    const activos = await PaseosAnimal.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaseosAnimal,
  getActivePaseosAnimal
};