const SexoAnimal = require("../models/SexoAnimal");

// Método para agregar un nuevo sexo de animal
const createSexoAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un sexo con el mismo valor
    const existeSexo = await SexoAnimal.findOne({ valor });
    if (existeSexo) {
      return res.status(400).json({ message: "El sexo ya existe" });
    }

    // Crear el nuevo sexo de animal
    const nuevoSexoAnimal = new SexoAnimal({ valor });
    await nuevoSexoAnimal.save();

    res.status(201).json(nuevoSexoAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los sexos activos (estado = 1)
const getActiveSexosAnimal = async (req, res) => {
  try {
    const sexos = await SexoAnimal.find({ estado: 1 }).select("valor estado");
    res.json(sexos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSexoAnimal,
  getActiveSexosAnimal
};