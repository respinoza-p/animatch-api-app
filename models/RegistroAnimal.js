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
    fotos: { type: [fotoSchema], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("RegistroAnimal", registroAnimalSchema);