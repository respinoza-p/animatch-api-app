const ComponenHogar = require("../models/ComponenHogar");

// 🔹 Método para agregar un nuevo ComponenHogar
const createComponenHogar = async (req, res) => {
  try {
    let { valor } = req.body;

    // Normalizar y validar entrada
    valor = valor.trim();

    if (!valor) {
      return res.status(400).json({ message: "El valor no puede estar vacio" });
    }

    // Verificar si ya existe
    const existeComponen = await ComponenHogar.findOne({ valor });
    if (existeComponen) {
      return res.status(400).json({ message: "El componen ya existe" });
    }

    // Crear y guardar el componen
    const nuevoComponen = await new ComponenHogar({ valor }).save();

    res.status(201).json({
      message: "ComponenHogar agregado correctamente",
      data: nuevoComponen
    });
  } catch (error) {
    console.error("Error en createComponenHogar:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getComponenHogarActivos = async (req, res) => {
  try {
    const activos = await ComponenHogar.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComponenHogar,
  getComponenHogarActivos
};