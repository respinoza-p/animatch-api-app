const mongoose = require("mongoose");

const usoChipSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del estado de uso de chip es obligatorio"],
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

const UsoChip = mongoose.model("UsoChip", usoChipSchema);
module.exports = UsoChip;