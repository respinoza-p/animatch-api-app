const mongoose = require("mongoose");

const fotoSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const registroAnimalSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    edad: { type: Number, required: true, min: 0 },
    peso: { type: Number, required: true, min: 0 },
    
    // Relaciones con otros modelos
    sexo: { type: mongoose.Schema.Types.ObjectId, ref: "SexoAnimal", required: true },
    chip: { type: mongoose.Schema.Types.ObjectId, ref: "UsoChip", required: true },
    alimentacion: { type: mongoose.Schema.Types.ObjectId, ref: "TipoAlimentacion", required: true },
    vacuna: { type: mongoose.Schema.Types.ObjectId, ref: "EstadoVacuna", required: true },
    esterilizado: { type: mongoose.Schema.Types.ObjectId, ref: "EstadoReproductivo", required: true },
    raza: { type: mongoose.Schema.Types.ObjectId, ref: "Raza", required: true },
    tamanioAnimal: { type: mongoose.Schema.Types.ObjectId, ref: "TamanioAnimal", required: true },
    tipoActividad: { type: mongoose.Schema.Types.ObjectId, ref: "TipoActividad", required: true },
    caracter: { type: mongoose.Schema.Types.ObjectId, ref: "CaracterAnimal", required: true },
    tipoEntrenamiento: { type: mongoose.Schema.Types.ObjectId, ref: "TipoEntrenamiento", required: true },
    cuidados: { type: mongoose.Schema.Types.ObjectId, ref: "TipoCuidados", required: true },
    problemaComportamiento: { type: mongoose.Schema.Types.ObjectId, ref: "ProblemaComportamiento", required: true },
    relacionOtrosAnimales: { type: mongoose.Schema.Types.ObjectId, ref: "RelacionOtrosAnimales", required: true },
    perroAptoPara: { type: mongoose.Schema.Types.ObjectId, ref: "TipoViviendaAnimal", required: true },
    pelechaCaspa: { type: mongoose.Schema.Types.ObjectId, ref: "PelechaCaspa", required: true },

    // Fechas
    fechaNacimiento: { type: Date, required: true },
    fechaRescate: { type: Date, required: true },

    // Cantidad de adopciones previas
    cantAdopciones: { type: Number, required: true, min: 0 },

    // Información del adoptante
    correo: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Por favor ingrese un correo electrónico válido."],
      lowercase: true,
      trim: true
    },

    // Fotos del animal
    fotos: { type: [fotoSchema], required: true },

    // Estado del registro (activo/inactivo)
    estadoRegistro: { type: Number, default: 0, enum: [0, 1] } // 0 = Inactivo, 1 = Activo
  },
  { timestamps: true }
);

const RegistroAnimal = mongoose.model("RegistroAnimal", registroAnimalSchema);

module.exports = RegistroAnimal;