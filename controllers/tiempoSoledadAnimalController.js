const TiempoSoledadAnimal = require("../models/TiempoSoledadAnimal");

// 📌 Método para agregar una nueva opción de tiempo de soledad del animal
const createTiempoSoledadAnimal = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await TiempoSoledadAnimal.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoTiempoSoledadAnimal = new TiempoSoledadAnimal({ valor });
    await nuevoTiempoSoledadAnimal.save();

    res.status(201).json(nuevoTiempoSoledadAnimal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveTiempoSoledadAnimal = async (req, res) => {
  try {
    const activos = await TiempoSoledadAnimal.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTiempoSoledadAnimal,
  getActiveTiempoSoledadAnimal
};