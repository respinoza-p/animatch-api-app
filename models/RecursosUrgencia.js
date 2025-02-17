const mongoose = require("mongoose");

const recursosUrgenciaSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor es obligatorio"],
      minlength: [2, "El valor debe tener al menos 2 caracteres"],
      maxlength: [120, "El valor no puede exceder los 120 caracteres"],
      unique: true
    },
    estado: {
      type: Number,
      enum: [0, 1], // 0 = inactivo, 1 = activo
      default: 1
    }
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
);

const RecursosUrgencia = mongoose.model("RecursosUrgencia", recursosUrgenciaSchema);
module.exports = RecursosUrgencia;