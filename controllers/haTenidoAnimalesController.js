const HaTenidoAnimales = require("../models/HaTenidoAnimales");

// 📌 Método para agregar una nueva opción de "Ha Tenido Animales"
const createHaTenidoAnimales = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await HaTenidoAnimales.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoHaTenidoAnimales = new HaTenidoAnimales({ valor });
    await nuevoHaTenidoAnimales.save();

    res.status(201).json(nuevoHaTenidoAnimales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveHaTenidoAnimales = async (req, res) => {
  try {
    const activos = await HaTenidoAnimales.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createHaTenidoAnimales,
  getActiveHaTenidoAnimales
};