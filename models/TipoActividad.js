const mongoose = require("mongoose");

const tipoActividadSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del tipo de actividad es obligatorio"],
      minlength: [3, "El valor debe tener al menos 3 caracteres"],
      maxlength: [50, "El valor no puede exceder los 50 caracteres"],
      unique: true
    },
    estado: {
      type: Number,
      enum: [0, 1],
      default: 1
    }
  },
  {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
  }
);

const TipoActividad = mongoose.model("TipoActividad", tipoActividadSchema);
module.exports = TipoActividad;