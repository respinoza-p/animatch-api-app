const PresupuestoMensual = require("../models/PresupuestoMensual");

// 📌 Método para agregar un nuevo rango de presupuesto mensual
const createPresupuestoMensual = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await PresupuestoMensual.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoPresupuestoMensual = new PresupuestoMensual({ valor });
    await nuevoPresupuestoMensual.save();

    res.status(201).json(nuevoPresupuestoMensual);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todos los rangos de presupuesto activos (estado = 1)
const getActivePresupuestoMensual = async (req, res) => {
  try {
    const activos = await PresupuestoMensual.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPresupuestoMensual,
  getActivePresupuestoMensual
};