const mongoose = require("mongoose");

const porqueDeseaAdoptarSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor es obligatorio"],
      minlength: [2, "El valor debe tener al menos 1 caracteres"],
      maxlength: [90, "El valor no puede exceder los 90 caracteres"],
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

const PorqueDeseaAdoptar = mongoose.model("PorqueDeseaAdoptar", porqueDeseaAdoptarSchema);
module.exports = PorqueDeseaAdoptar;