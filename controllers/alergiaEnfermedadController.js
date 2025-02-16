const AlergiaEnfermedad = require("../models/AlergiaEnfermedad");

// Método para agregar un nuevo tipo de entrenamiento
const createAlergiaEnfermedad= async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un tipo de entrenamiento con el mismo valor
    const alergiaEnfermedad = await AlergiaEnfermedad.findOne({ valor });
    if (alergiaEnfermedad) {
      return res.status(400).json({ message: "Pregunta ya existe" });
    }

    // Crear el nuevo tipo de entrenamiento
    const nuevoAlergiaEnfermedad = new AlergiaEnfermedad({ valor });
    await nuevoAlergiaEnfermedad.save();

    res.status(201).json(nuevoAlergiaEnfermedad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Método para obtener todos los tipos de entrenamiento activos (estado = 1)
const getActiveAlergiaEnfermedad= async (req, res) => {
  try {
    const tipos = await AlergiaEnfermedad.find({ estado: 1 }).select("valor estado");
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAlergiaEnfermedad,
  getActiveAlergiaEnfermedad
};