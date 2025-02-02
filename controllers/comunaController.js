const mongoose = require("mongoose");
const Comuna = require("../models/Comuna");
const Region = require("../models/Region");

// Obtener todas las comunas con la región asociada
const getComunas = async (req, res) => {
  try {
    const comunas = await Comuna.find().populate("region", "nombre");
    res.json(comunas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una o varias comunas
const createComuna = async (req, res) => {
  try {
    let comunas = req.body; // Puede ser un array o un solo objeto

    if (!Array.isArray(comunas)) {
      comunas = [comunas]; // Si es un solo objeto, lo convertimos en un array
    }

    const comunasCreadas = [];

    for (let comunaData of comunas) {
      const { nombre, region } = comunaData;

      // Validar que la región sea un ObjectId válido
      if (!mongoose.isValidObjectId(region)) {
        return res.status(400).json({ message: `El ID de la región ${region} no es válido.` });
      }

      // Buscar la región en la base de datos
      const regionExistente = await Region.findById(region);
      if (!regionExistente) {
        return res.status(404).json({ message: `La región especificada con ID ${region} no existe.` });
      }

      // Normalizar el nombre de la comuna
      const nombreNormalizado = nombre.trim().toLowerCase();

      // Verificar si la comuna ya existe en esa región
      const comunaExistente = await Comuna.findOne({
        nombre: new RegExp(`^${nombreNormalizado}$`, "i"),
        region: region,
      });

      if (comunaExistente) {
        return res.status(400).json({ message: `La comuna "${nombre}" ya está registrada en esta región.` });
      }

      // Crear la nueva comuna
      const nuevaComuna = new Comuna({
        nombre: nombreNormalizado,
        region,
      });

      await nuevaComuna.save();
      comunasCreadas.push(nuevaComuna);
    }

    res.status(201).json({
      message: `Se han creado ${comunasCreadas.length} comuna(s) correctamente.`,
      comunas: comunasCreadas,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las comunas con estado = 1
const getActiveComunas = async (req, res) => {
  try {
    const comunas = await Comuna.find({ estado: 1 }).select("nombre estado region");
    res.json(comunas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exportar las funciones correctamente
module.exports = {
  getComunas,
  createComuna,
  getActiveComunas
};