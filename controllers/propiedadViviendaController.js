const PropiedadVivienda = require("../models/PropiedadVivienda");

// 📌 Método para agregar una nueva opción de propiedad de la vivienda
const createPropiedadVivienda = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await PropiedadVivienda.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevaPropiedadVivienda = new PropiedadVivienda({ valor });
    await nuevaPropiedadVivienda.save();

    res.status(201).json(nuevaPropiedadVivienda);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActivePropiedadVivienda = async (req, res) => {
  try {
    const activos = await PropiedadVivienda.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPropiedadVivienda,
  getActivePropiedadVivienda
};