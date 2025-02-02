const mongoose = require("mongoose");
const Region = require("../models/Region");
const Pais = require("../models/Pais");

// Obtener todas las regiones
const getRegiones = async (req, res) => {
  try {
    const regiones = await Region.find().populate("pais", "nombre");
    res.json(regiones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva región
const createRegion = async (req, res) => {
  try {
    const { nombre, pais } = req.body;

    // 🔹 Verificar que el campo 'pais' no sea nulo o undefined
    if (!pais) {
      return res.status(400).json({ message: "El campo 'pais' es obligatorio." });
    }

    // 🔹 Validar que el ID del país sea un ObjectId válido
    if (!mongoose.isValidObjectId(pais)) {
      return res.status(400).json({ message: "El ID del país no es válido." });
    }

    // 🔹 Convertir el ID del país a ObjectId correctamente
    const paisId = mongoose.Types.ObjectId.createFromHexString(pais);

    // 🔹 Buscar el país en la base de datos
    const paisExistente = await Pais.findById(paisId);
    if (!paisExistente) {
      return res.status(404).json({ message: "El país especificado no existe." });
    }

    // 🔹 Normalizar el nombre de la región
    const nombreNormalizado = nombre.trim().toLowerCase();

    // 🔹 Verificar si la región ya existe en ese país
    const regionExistente = await Region.findOne({
      nombre: new RegExp(`^${nombreNormalizado}$`, "i"),
      pais: paisId,
    });

    if (regionExistente) {
      return res.status(400).json({ message: "La región ya está registrada en este país." });
    }

    // 🔹 Crear la nueva región
    const nuevaRegion = new Region({
      nombre: nombreNormalizado,
      pais: paisId,
    });

    await nuevaRegion.save();

    res.status(201).json({
      message: "Región creada con éxito",
      region: nuevaRegion,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las regiones con estado = 1
const getActiveRegiones = async (req, res) => {
  try {
    const regiones = await Region.find({ estado: 1 }).select("nombre estado");
    res.json(regiones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportar las funciones correctamente
module.exports = {
  getRegiones,
  createRegion,
  getActiveRegiones
};