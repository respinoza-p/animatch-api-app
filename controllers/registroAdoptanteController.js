const Adoptante = require("../models/Adoptante");

const createRegistroAdoptante = async (req, res) => {
    try {
      console.log("🟢 [SERVER] Recibiendo solicitud POST en /api/humano/registroAdoptante");
      console.log("📩 Datos recibidos en el cuerpo de la solicitud (req.body):", req.body);
  
      const {
        correo,
        componenHogar,
        fraseIdentifica,
        porqueDeseaAdoptar,
        alergiaEnfermedad,
        haTenidoAnimales,
        actualmenteTengo,
        tamAnimal,
        edadAnimal,
        opinionEsteriliza,
        dispuestoAdoptar,
        vivoEn,
        presupuestoMensual,
        paseosAnimal,
        tiempoSoledadAnimal
      } = req.body;
  
      if (!correo) {
        console.error("❌ [ERROR] No se recibió el correo del adoptante.");
        return res.status(400).json({ message: "El correo electrónico es obligatorio." });
      }
  
      console.log(`🔎 [INFO] Buscando registro con correo: ${correo}`);
  
      const existeRegistro = await Adoptante.findOne({ correo });
  
      if (existeRegistro) {
        console.log(`📝 [INFO] Registro existente encontrado, se procederá a actualizar: ${correo}`);
        
        const registroActualizado = await Adoptante.findOneAndUpdate(
          { correo },
          {
            componenHogar,
            fraseIdentifica,
            porqueDeseaAdoptar,
            alergiaEnfermedad,
            haTenidoAnimales,
            actualmenteTengo,
            tamAnimal,
            edadAnimal,
            opinionEsteriliza,
            dispuestoAdoptar,
            vivoEn,
            presupuestoMensual,
            paseosAnimal,
            tiempoSoledadAnimal
          },
          { new: true } // Retorna el documento actualizado
        );
  
        console.log("✅ [ACTUALIZACIÓN EXITOSA] Registro actualizado:", registroActualizado);
        return res.status(200).json({ message: "Registro actualizado exitosamente", data: registroActualizado });
      }
  
      console.log(`📌 [INFO] No existe un registro previo, se creará un nuevo registro para: ${correo}`);
  
      const nuevoRegistro = new Adoptante({
        correo,
        componenHogar,
        fraseIdentifica,
        porqueDeseaAdoptar,
        alergiaEnfermedad,
        haTenidoAnimales,
        actualmenteTengo,
        tamAnimal,
        edadAnimal,
        opinionEsteriliza,
        dispuestoAdoptar,
        vivoEn,
        presupuestoMensual,
        paseosAnimal,
        tiempoSoledadAnimal
      });
  
      await nuevoRegistro.save();
  
      console.log("✅ [REGISTRO CREADO] Registro guardado exitosamente:", nuevoRegistro);
  
      return res.status(201).json({ message: "Registro guardado exitosamente", data: nuevoRegistro });
    } catch (error) {
      console.error("❌ [ERROR] Error al crear o actualizar el registro del adoptante:", error);
      return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
  };

const getRegistroAdoptante = async (req, res) => {
  try {
    const { correo } = req.params;

    const registro = await Adoptante.findOne({ correo })
      .populate('componenHogar')
      .populate('fraseIdentifica')
      .populate('porqueDeseaAdoptar')
      .populate('alergiaEnfermedad')
      .populate('haTenidoAnimales')
      .populate('actualmenteTengo')
      .populate('tamAnimal')
      .populate('edadAnimal')
      .populate('opinionEsteriliza')
      .populate('dispuestoAdoptar')
      .populate('vivoEn')
      .populate('presupuestoMensual')
      .populate('paseosAnimal')
      .populate('tiempoSoledadAnimal');

    if (!registro) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    return res.status(200).json({ data: registro });
  } catch (error) {
    console.error('Error al obtener el registro del adoptante:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
    createRegistroAdoptante,
    getRegistroAdoptante
  };