const OpinionEsteriliza = require("../models/OpinionEsteriliza");

// 📌 Método para agregar una nueva opinión sobre esterilización
const createOpinionEsteriliza = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await OpinionEsteriliza.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Esta opinión ya existe" });
    }

    // Crear un nuevo registro
    const nuevaOpinionEsteriliza = new OpinionEsteriliza({ valor });
    await nuevaOpinionEsteriliza.save();

    res.status(201).json(nuevaOpinionEsteriliza);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opiniones activas (estado = 1)
const getActiveOpinionEsteriliza = async (req, res) => {
  try {
    const activas = await OpinionEsteriliza.find({ estado: 1 }).select("valor estado");
    res.json(activas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOpinionEsteriliza,
  getActiveOpinionEsteriliza
};