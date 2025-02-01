const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    // Nombre de la región
    nombre: {
      type: String,
      required: [true, "El nombre de la región es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [80, "El nombre no puede exceder los 50 caracteres"],
      trim: true,
    },

    // Estado de la región (activo o inactivo)
    estado: {
      type: Number,
      enum: [0, 1], // 0: inactivo, 1: activo
      default: 1,
    },

    // Relación con País (una región pertenece a un país)
    pais: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pais",
      required: [true, "El país es obligatorio"],
    },
  },
  {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
  }
);

const Region = mongoose.model("Region", regionSchema);
module.exports = Region;