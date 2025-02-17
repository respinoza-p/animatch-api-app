const CompromisosAdoptante = require("../models/CompromisosAdoptante");

// 📌 Método para agregar una nueva opción de compromiso del adoptante
const createCompromisosAdoptante = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await CompromisosAdoptante.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoCompromiso = new CompromisosAdoptante({ valor });
    await nuevoCompromiso.save();

    res.status(201).json(nuevoCompromiso);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveCompromisosAdoptante = async (req, res) => {
  try {
    const activos = await CompromisosAdoptante.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCompromisosAdoptante,
  getActiveCompromisosAdoptante
};