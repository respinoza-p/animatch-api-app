const mongoose = require("mongoose");

const sexoAnimalSchema = new mongoose.Schema(
  {
    valor: {
      type: String,
      required: [true, "El valor del sexo es obligatorio"],
      minlength: [3, "El valor debe tener al menos 3 caracteres"],
      maxlength: [20, "El valor no puede exceder los 20 caracteres"],
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

const SexoAnimal = mongoose.model("SexoAnimal", sexoAnimalSchema);
module.exports = SexoAnimal;