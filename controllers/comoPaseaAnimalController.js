const ComoPaseaAnimal = require("../models/ComoPaseaAnimal");

// 📌 Método para agregar una nueva opción de cómo pasea al animal
const createComoPaseaAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await ComoPaseaAnimal.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoComoPaseaAnimal = new ComoPaseaAnimal({ valor });
    await nuevoComoPaseaAnimal.save();

    res.status(201).json(nuevoComoPaseaAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveComoPaseaAnimal = async (req, res) => {
  try {
    const activos = await ComoPaseaAnimal.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComoPaseaAnimal,
  getActiveComoPaseaAnimal
};