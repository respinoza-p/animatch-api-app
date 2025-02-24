const RegistroAnimal = require("../models/RegistroAnimal");

const createRegistroAnimal = async (req, res) => {
  try {
    // Imprimir por consola el JSON entrante (req.body)
    console.log("Datos del formulario:", req.body);

    // Si se han subido archivos, también se pueden imprimir
    if (req.files) {
      console.log("Archivos recibidos:", req.files);
    }

    // Extraer los campos del formulario, incluyendo el correo electrónico
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
      pelechaCaspa,
      correo
    } = req.body;

    // Procesar los archivos subidos y asignarlos al campo fotos
    // Se espera recibir un máximo de 3 fotos
    let fotos = [];
    if (req.files && req.files.length > 0) {
      fotos = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    } else {
      return res
        .status(400)
        .json({ error: "Debe cargar al menos una fotografía." });
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
      correo, // Agregamos el correo al objeto de registro
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