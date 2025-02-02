const CaracterAnimal = require("../models/CaracterAnimal");

// Método para agregar un nuevo carácter de animal
const createCaracterAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un carácter con el mismo valor
    const existeCaracter = await CaracterAnimal.findOne({ valor });
    if (existeCaracter) {
      return res.status(400).json({ message: "El carácter del animal ya existe" });
    }

    // Crear el nuevo carácter del animal
    const nuevoCaracterAnimal = new CaracterAnimal({ valor });
    await nuevoCaracterAnimal.save();

    res.status(201).json(nuevoCaracterAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los caracteres de animales activos (estado = 1)
const getActiveCaracteresAnimal = async (req, res) => {
  try {
    const caracteres = await CaracterAnimal.find({ estado: 1 }).select("valor estado");
    res.json(caracteres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCaracterAnimal,
  getActiveCaracteresAnimal
};