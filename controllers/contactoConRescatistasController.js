const ContactoConRescatistas = require("../models/ContactoConRescatistas");

// 📌 Método para agregar una nueva opción sobre contacto con rescatistas
const createContactoConRescatistas = async (req, res) => {
  try {
    const { valor } = req.body;

    // Validar si ya existe un registro con el mismo valor
    const existente = await ContactoConRescatistas.findOne({ valor });
    if (existente) {
      return res.status(400).json({ message: "Este valor ya existe" });
    }

    // Crear un nuevo registro
    const nuevoContacto = new ContactoConRescatistas({ valor });
    await nuevoContacto.save();

    res.status(201).json(nuevoContacto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Método para obtener todas las opciones activas (estado = 1)
const getActiveContactoConRescatistas = async (req, res) => {
  try {
    const activos = await ContactoConRescatistas.find({ estado: 1 }).select("valor estado");
    res.json(activos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createContactoConRescatistas,
  getActiveContactoConRescatistas
};