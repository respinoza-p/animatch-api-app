const RegistroAnimal = require("../models/RegistroAnimal");

const createRegistroAnimal = async (req, res) => {
  try {
    console.log("📩 Datos recibidos en createRegistroAnimal:", req.body);

    // Si se han subido archivos, imprimirlos en consola
    if (req.files) {
      console.log("📸 Archivos recibidos:", req.files.map((file) => file.originalname));
    }

    // Extraer los datos del cuerpo de la petición
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
      tamanioAnimal,
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

    // Validar si ya existe un registro asociado al correo
    let registroExistente = await RegistroAnimal.findOne({ correo });

    // Procesar las fotos subidas (máx 3 imágenes)
    let fotos = [];
    if (req.files && req.files.length > 0) {
      fotos = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype
      }));
    } else {
      return res.status(400).json({ error: "Debe cargar al menos una fotografía." });
    }

    if (registroExistente) {
      console.log("🔄 Actualizando registro existente para:", correo);

      // Actualizar el registro existente
      registroExistente = await RegistroAnimal.findOneAndUpdate(
        { correo },
        {
          nombre,
          edad: Number(edad),
          peso: Number(peso),
          sexo,
          chip,
          alimentacion,
          vacuna,
          esterilizado,
          raza,
          tamanioAnimal,
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
        },
        { new: true } // Devuelve el registro actualizado
      );

      return res.status(200).json({
        message: "Registro actualizado exitosamente",
        data: registroExistente
      });
    }

    // Crear un nuevo registro si no existe
    console.log("🆕 Creando nuevo registro para:", correo);
    const nuevoRegistro = new RegistroAnimal({
      nombre,
      edad: Number(edad),
      peso: Number(peso),
      sexo,
      chip,
      alimentacion,
      vacuna,
      esterilizado,
      raza,
      tamanioAnimal,
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
      correo,
      fotos
    });

    // Guardar en la base de datos
    const registroGuardado = await nuevoRegistro.save();

    return res.status(201).json({
      message: "Registro guardado exitosamente",
      data: registroGuardado
    });
  } catch (error) {
    console.error("❌ Error en createRegistroAnimal:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

// 🔹 Nuevo servicio para obtener un registro por correo
const getRegistroAnimalByCorreo = async (req, res) => {
  try {
    const { correo } = req.params;
    console.log("📢 Buscando registro de animal para:", correo);

    const registro = await RegistroAnimal.findOne({ correo })
      .populate("sexo")
      .populate("chip")
      .populate("alimentacion")
      .populate("vacuna")
      .populate("esterilizado")
      .populate("raza")
      .populate("tamanioAnimal")
      .populate("tipoActividad")
      .populate("caracter")
      .populate("tipoEntrenamiento")
      .populate("cuidados")
      .populate("problemaComportamiento")
      .populate("relacionOtrosAnimales")
      .populate("perroAptoPara")
      .populate("pelechaCaspa");

    if (!registro) {
      console.log("⚠️ No se encontró registro para:", correo);
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    console.log("✅ Registro encontrado:", registro);
    return res.status(200).json({ data: registro });
  } catch (error) {
    console.error("❌ Error en getRegistroAnimalByCorreo:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createRegistroAnimal,
  getRegistroAnimalByCorreo
};