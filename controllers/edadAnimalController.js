const EdadAnimal = require("../models/EdadAnimal");

// 📌 Método para agregar una nueva opción de "Edad del Animal"
const createEdadAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await EdadAnimal.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevaEdadAnimal = new EdadAnimal({ valor });
    await nuevaEdadAnimal.save();

    res.status(201).json(nuevaEdadAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveEdadAnimal = async (req, res) => {
  try {
    const activos = await EdadAnimal.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEdadAnimal,
  getActiveEdadAnimal
};