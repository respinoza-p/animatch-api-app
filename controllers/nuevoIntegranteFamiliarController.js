const NuevoIntegranteFamiliar = require("../models/NuevoIntegranteFamiliar");

// 📌 Método para agregar una nueva opción sobre la llegada de un nuevo integrante familiar
const createNuevoIntegranteFamiliar = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await NuevoIntegranteFamiliar.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoRegistro = new NuevoIntegranteFamiliar({ valor });
    await nuevoRegistro.save();

    res.status(201).json(nuevoRegistro);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveNuevoIntegranteFamiliar = async (req, res) => {
  try {
    const activos = await NuevoIntegranteFamiliar.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNuevoIntegranteFamiliar,
  getActiveNuevoIntegranteFamiliar
};