const mongoose = require("mongoose");

const pelechaCaspaSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor de pelecha/caspa es obligatorio"],
      minlength: [2, "El valor debe tener al menos 3 caracteres"],
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
pelechaCaspaSchema.index({ valor: 1 }, { unique: true });

const PelechaCaspa = mongoose.model("PelechaCaspa", pelechaCaspaSchema);
module.exports = PelechaCaspa;