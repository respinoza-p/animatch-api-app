const mongoose = require("mongoose");

const tamanioAnimalSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del tamaño del animal es obligatorio"],
      minlength: [3, "El valor debe tener al menos 3 caracteres"],
      maxlength: [80, "El valor no puede exceder los 20 caracteres"],
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

const TamanioAnimal = mongoose.model("TamanioAnimal", tamanioAnimalSchema);
module.exports = TamanioAnimal;