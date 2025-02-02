const TamanioAnimal = require("../models/TamanioAnimal");

// Método para agregar un nuevo tamaño de animal
const createTamanioAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tamaño con el mismo valor
    const existeTamanio = await TamanioAnimal.findOne({ valor });
    if (existeTamanio) {
      return res.status(400).json({ message: "El tamaño del animal ya existe" });
    }

    // Crear el nuevo tamaño de animal
    const nuevoTamanioAnimal = new TamanioAnimal({ valor });
    await nuevoTamanioAnimal.save();

    res.status(201).json(nuevoTamanioAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tamaños de animal activos (estado = 1)
const getActiveTamaniosAnimal = async (req, res) => {
  try {
    const tamanios = await TamanioAnimal.find({ estado: 1 }).select("valor estado");
    res.json(tamanios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTamanioAnimal,
  getActiveTamaniosAnimal
};