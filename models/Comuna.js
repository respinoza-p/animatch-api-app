const mongoose = require("mongoose");

const comunaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre de la comuna es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
      trim: true,
    },
    estado: {
      type: Number,
      enum: [0, 1], // 0: Inactivo, 1: Activo
      default: 1,
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
      required: [true, "La región es obligatoria"],
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  }
);

const Comuna = mongoose.model("Comuna", comunaSchema);
module.exports = Comuna;