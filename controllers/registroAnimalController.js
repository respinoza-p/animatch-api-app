const RegistroAnimal = require("../models/RegistroAnimal");

const createRegistroAnimal = async (req, res) => {
  try {
    // Los campos del formulario vienen en req.body
    // y los archivos (fotos) en req.files
    const {
      nombre,
      edad,
      peso,
      sexo,
      chip,
      alimentacion,
      vacuna,
      esterilizado,
      raza,
      tamAnimal,
      fechaNacimiento,
      fechaRescate,
      cantAdopciones,
      tipoActividad,
      caracter,
      tipoEntrenamiento,
      cuidados,
      problemaComportamiento,
      relacionOtrosAnimales,
      perroAptoPara,
      pelechaCaspa
    } = req.body;

    // Se procesan los archivos subidos y se asignan al campo fotos
    // Se espera recibir un máximo de 3 fotos
    let fotos = [];
    if (req.files && req.files.length > 0) {
      fotos = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    } else {
      return res.status(400).json({ error: "Debe cargar al menos una fotografía." });
    }

    const registroData = {
      nombre,
      edad: Number(edad),
      peso: Number(peso),
      sexo,
      chip,
      alimentacion,
      vacuna,
      esterilizado,
      raza,
      tamAnimal,
      fechaNacimiento: new Date(fechaNacimiento),
      fechaRescate: new Date(fechaRescate),
      cantAdopciones: Number(cantAdopciones),
      tipoActividad,
      caracter,
      tipoEntrenamiento,
      cuidados,
      problemaComportamiento,
      relacionOtrosAnimales,
      perroAptoPara,
      pelechaCaspa,
      fotos
    };

    const nuevoRegistro = new RegistroAnimal(registroData);
    const registroGuardado = await nuevoRegistro.save();
    res.status(201).json(registroGuardado);
  } catch (error) {
    console.error("Error al crear RegistroAnimal:", error);
    res.status(500).json({ error: "Error al guardar el registro" });
  }
};

module.exports = {
  createRegistroAnimal
};