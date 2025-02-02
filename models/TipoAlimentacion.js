const mongoose = require("mongoose");

const tipoAlimentacionSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del tipo de alimentación es obligatorio"],
      minlength: [2, "El valor debe tener al menos 3 caracteres"],
      maxlength: [90, "El valor no puede exceder los 50 caracteres"],
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

const TipoAlimentacion = mongoose.model("TipoAlimentacion", tipoAlimentacionSchema);
module.exports = TipoAlimentacion;