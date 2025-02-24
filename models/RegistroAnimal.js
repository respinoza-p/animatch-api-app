const mongoose = require("mongoose");

const fotoSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const registroAnimalSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    edad: { type: Number, required: true },
    peso: { type: Number, required: true },
    sexo: { type: String, required: true },
    chip: { type: String, required: true },
    alimentacion: { type: String, required: true },
    vacuna: { type: String, required: true },
    esterilizado: { type: String, required: true },
    raza: { type: String, required: true },
    tamAnimal: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    fechaRescate: { type: Date, required: true },
    cantAdopciones: { type: Number, required: true },
    tipoActividad: { type: String, required: true },
    caracter: { type: String, required: true },
    tipoEntrenamiento: { type: String, required: true },
    cuidados: { type: String, required: true },
    problemaComportamiento: { type: String, required: true },
    relacionOtrosAnimales: { type: String, required: true },
    perroAptoPara: { type: String, required: true },
    pelechaCaspa: { type: String, required: true },
    correo: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Por favor ingrese un correo electrónico válido."]
    },
    fotos: { type: [fotoSchema], required: true },

    // Nuevo campo estadoRegistro (opcional, valor por defecto 0)
    estadoRegistro: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const RegistroAnimal = mongoose.model("RegistroAnimal", registroAnimalSchema);

module.exports = RegistroAnimal;