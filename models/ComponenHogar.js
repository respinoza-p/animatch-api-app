const mongoose = require("mongoose");

const ComponenHogarSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [3, "La descripción debe tener al menos 3 caracteres"],
    maxlength: [90, "La descripción no puede exceder los 90 caracteres"],
    unique: true
  },
  estado: {
    type: Number,
    enum: [0, 1], // 1 = Activo, 0 = Inactivo
    default: 1
  }
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

module.exports = mongoose.model("ComponenHogar", ComponenHogarSchema);