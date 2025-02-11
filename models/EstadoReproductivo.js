const mongoose = require("mongoose");

const estadoReproductivoSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del estado reproductivo es obligatorio"],
      minlength: [3, "El valor debe tener al menos 3 caracteres"],
      maxlength: [50, "El valor no puede exceder los 50 caracteres"],
      unique: true,
      trim: true,
      lowercase: true
    },
    estado: {
      type: Number,
      enum: [0, 1],
      default: 1
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Crea automáticamente createdAt y updatedAt
  }
);

const EstadoReproductivo = mongoose.model("EstadoReproductivo", estadoReproductivoSchema);
module.exports = EstadoReproductivo;