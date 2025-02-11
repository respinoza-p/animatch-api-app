const mongoose = require("mongoose");

const problemaComportamientoSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del problema de comportamiento es obligatorio"],
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
    timestamps: true // Agrega automáticamente createdAt y updatedAt
  }
);

// Asegurar índice único para "valor"
problemaComportamientoSchema.index({ valor: 1 }, { unique: true });

const ProblemaComportamiento = mongoose.model("ProblemaComportamiento", problemaComportamientoSchema);
module.exports = ProblemaComportamiento;