const HerenciaAnimal = require("../models/HerenciaAnimal");

// 📌 Método para agregar una nueva opción sobre la herencia del animal
const createHerenciaAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await HerenciaAnimal.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevaHerenciaAnimal = new HerenciaAnimal({ valor });
    await nuevaHerenciaAnimal.save();

    res.status(201).json(nuevaHerenciaAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveHerenciaAnimal = async (req, res) => {
  try {
    const activos = await HerenciaAnimal.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHerenciaAnimal,
  getActiveHerenciaAnimal
};