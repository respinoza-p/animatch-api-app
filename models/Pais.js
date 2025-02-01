const mongoose = require("mongoose");

const paisSchema = new mongoose.Schema(
  {
    // Nombre del país
    nombre: {
      type: String,
      required: [true, "El nombre del país es obligatorio"],
      minlength: [4, "El nombre debe tener al menos 4 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
      unique: true, // 🔹 Asegura que el nombre sea único
      trim: true,
    },

    // Fecha de registro
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },

    // Estado del registro
    estado: { 
      type: Number, 
      enum: [0, 1], 
      default: 1 
    },
  },
  {
    timestamps: true, // Campos createdAt y updatedAt automáticos
  }
);

// Manejo de errores para duplicados (índice único)
paisSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("El nombre del país ya está registrado."));
  } else {
    next(error);
  }
});

const Pais = mongoose.model("Pais", paisSchema);
module.exports = Pais;