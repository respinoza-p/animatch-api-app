const mongoose = require("mongoose");

const edadAnimalSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor es obligatorio"],
      minlength: [1, "El valor debe tener al menos 1 caracter"],
      maxlength: [50, "El valor no puede exceder los 50 caracteres"],
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

const EdadAnimal = mongoose.model("EdadAnimal", edadAnimalSchema);
module.exports = EdadAnimal;